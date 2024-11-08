const express = require('express')
require("dotenv").config();
const mongoose = require("mongoose");
const https = require("https");
const http = require("http");
const path = require("path");
const fs = require("fs");
const cookieParser = require("cookie-parser");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");
const cors = require('cors');
const {requireCsrf, csrfProtection} = require("./Middleware/requireCSRF")

const app = express()

//SSL Spot for ZOE

//-----------------

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
app.listen(3000, () => {console.log("Listening on port 4000")})
