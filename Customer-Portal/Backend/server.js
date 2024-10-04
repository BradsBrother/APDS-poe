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

    mongoose.connect(process.env.MONGO_URI)
        .then(() => {
            app.listen(process.env.PORT, () => {
                console.log("Listening on port: ",process.env.PORT)
            })
        })
        .catch((error) => {
        console.log(error)
    })

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