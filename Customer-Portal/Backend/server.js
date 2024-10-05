const express = require("express")
require('dotenv').config()
const mongoose = require("mongoose")
const userRoutes = require("./Routes/User")
const paymentRoutes = require("./Routes/Payment")
const https = require("https")
const path = require("path")
const fs = require("fs")
const cookieParser = require("cookie-parser")
const csurf = require("csurf")

const app = express()

const sslKeyPath = path.resolve(__dirname, "ssl/server.key"); 
const sslCertPath = path.resolve(__dirname, "ssl/server.cert");

const sslOptions = {
    key: fs.readFileSync(sslKeyPath),
    cert: fs.readFileSync(sslCertPath),
  };

    mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        console.log("Connected to MongoDB");

        // Start the HTTPS server
        https.createServer(sslOptions, app).listen(process.env.PORT, () => {
            console.log("Listening on HTTPS port:", process.env.PORT);
        });

        // Start an HTTP server to redirect to HTTPS
        http.createServer((req, res) => {
            res.writeHead(301, { "Location": `https://${req.headers.host}${req.url}` });
            res.end();
        }).listen(80, () => {
            console.log("HTTP server running on port 80, redirecting to HTTPS");
        });
    })
    .catch((error) => {
        console.log(error);
    });

    app.use(cookieParser())
    app.use(express.json())

    /*app.use(csurf({
        cookie: {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "Lax",
        }
    }))        */

    app.use((req, res, next) => {
        //res.locals.csurfToken = req.csurfToken()
        console.log(req.path, req.method)
        //console.log('CSRF Token:', res.locals.csurfToken);
        next()
    })

   app.use("/api/User", userRoutes)
   app.use("/api/Payment", paymentRoutes)