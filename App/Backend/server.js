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
const employeeRoutes = require("./Routes/Employee")


let app = express();
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

// CORS options to allow frontend origin and credentials
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
      frameAncestors: ["'example.com'"],
      blockAllMixedContent: [],
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

const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, 
  max: 5, 
  message: "Too many login attempts. Try again later.",
});
app.use("/api/User/login", loginLimiter);

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
  app.use("/api/Employee", employeeRoutes)



