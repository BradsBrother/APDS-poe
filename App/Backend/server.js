const express = require("express");
require("dotenv").config();
const mongoose = require("mongoose");
const userRoutes = require("./Routes/User");
const paymentRoutes = require("./Routes/Payment");
const https = require("https");
const http = require("http");
const path = require("path");
const fs = require("fs");
const cookieParser = require("cookie-parser");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");
const cors = require('cors');
const ExpressBrute = require('express-brute');
const {requireCsrf, csrfProtection} = require("./Middleware/requireCSRF.js");

// Initialize the Express app
const app = express();

// Path for SSL certificate and key
const sslKeyPath = path.resolve("./ssl/server.key");
const sslCertPath = path.resolve("./ssl/server.cert");

let sslKey, sslCert;

// Read SSL files
try {
  sslKey = fs.readFileSync(sslKeyPath);
  sslCert = fs.readFileSync(sslCertPath);
} catch (error) {
  console.error("Error reading SSL files:", error);
}

const options = {
  key: sslKey,
  cert: sslCert,
}

// Middleware
app.use(helmet());
app.use(cookieParser()); // For handling cookies
app.use(express.json()); 

// Updated CORS options to allow frontend origin and credentials
const corsOptions = {
  origin: 'https://localhost:3000', // Frontend URL
  credentials: true, 
};
app.use(cors(corsOptions));

// Setting up the CSP
app.use(
  helmet.contentSecurityPolicy({
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc: ["'self'"],
      styleSrc: ["'self'", "'unsafe-inline'"],
      imgSrc: ["'self'", "data:"],
    },
  })
);

// XSS Filter
app.use(helmet.xssFilter());

// HTTP Strict Transport Security (HSTS)
app.use(
  helmet.hsts({
    maxAge: 31536000, // 1 year in seconds
    includeSubDomains: true,
    preload: true,
  })
);

// NoSniff prevents browsers from trying to guess ("sniff") the data types being sent 
app.use(helmet.noSniff());

// Frameguard prevents clickjacking by disallowing iframes
app.use(
  helmet.frameguard({
    action: 'deny',
  })
);

// Logging middleware for request path and method
app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

// Rate limiting middleware for login attempts
const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // Limit to 5 requests 
  message: "Too many login attempts. Try again later.",
});
app.use("/api/User/login", loginLimiter);

// express-brute
const store = new ExpressBrute.MemoryStore(); 
const bruteforce = new ExpressBrute(store, {
  freeRetries: 5,             // 5 attempts before blocking the user
  minWait: 5 * 60 * 1000,     // 5 minutes wait after limit has been reached
  maxWait: 60 * 60 * 1000,    // 1-hour lock 
  lifetime: 24 * 60 * 60,     // Track for 1 day
});

// Apply express-brute to the login route
app.post("/api/User/login", bruteforce.prevent, (req, res) => {
  // Your login logic here
  res.send('Login attempted');
});

// MongoDB connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("Connected to MongoDB");

    // Start the HTTPS server
    https.createServer(options, app).listen(process.env.PORT, () => {
      console.log("Listening on HTTPS port:", process.env.PORT);
    });

    // Start an HTTP server to redirect to HTTPS
    http.createServer((req, res) => {
      res.writeHead(301, { Location: `https://${req.headers.host}${req.url}` });
      res.end();
    }).listen(80, () => {
      console.log("HTTP server running on port 80, redirecting to HTTPS");
    });
  })
  .catch((error) => {
    console.error("MongoDB connection error:", error);
  });

app.get('/csrf-token', csrfProtection, (req, res) => {
  res.json({ csrfToken: req.csrfToken() });
});

app.use(requireCsrf); 

// Error handling for CSRF
app.use((err, req, res, next) => {
  if (err.code === 'EBADCSRFTOKEN') {
    // Token missing or invalid
    res.status(403).json({ error: 'Invalid CSRF token' });
  } else {
    next(err);
  }
});

// API routes
app.use("/api/User", userRoutes);
app.use("/api/Payment", paymentRoutes);
