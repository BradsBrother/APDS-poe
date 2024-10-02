const express = require("express")
require('dotenv').config()
const mongoose = require("mongoose")
const userRoutes = require("./Routes/User")


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

 app.use(express.json())


app.use((req, res, next) => {
    console.log(req.path, req.method)
    next()
   })


   app.use("/api/user", userRoutes)
