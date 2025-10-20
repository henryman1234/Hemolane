import express from "express"
import mongoose, { Mongoose } from "mongoose"
import dotenv from "dotenv"
dotenv.config()
import CookieParser from "cookie-parser"
import cors from "cors"
import cookieParser from "cookie-parser"
import morgan from "morgan"
import authRoute from "./routes/auth.js"
import usersRoute from "./routes/users.js";
import hospitalsRoute from "./routes/hospitals.js";
import BloodBanksRoute from "./routes/bloodBanks.js";

// Initialise express
const app = express()


// Middleware
app.use(cors())
app.use(cookieParser())
app.use(morgan("dev"))
app.use(express.json())

app.use("/api/users", usersRoute)
app.use("/api/auth", authRoute)
app.use("/api/bloodBanks", BloodBanksRoute)
app.use("/api/hospitals", hospitalsRoute)



// HandeError
app.use(function(err, req, res, next) {
    const errorStatus = err.status || 500
    const errorMessage = err?.message || "Une érreur est survenue"
    return res?.status(errorStatus).json({
        success: false,
        status: errorStatus,
        message: errorMessage,
        stack: err?.stack
    })
})


// Connect to MongoDB
const connect = async function () {
    try {
        await mongoose.connect(process.env.MONGO_DB_URI?.trim())
        console.log("Already connected to MongoDB")
    } catch (err) {
        throw err
    }
}

// Listen events on Database connection
mongoose.connection.on("connected", function(){
    console.log("Mongo DB is connected")
})

mongoose.connection.on("disconnected", function(){
    console.log("Mongo DB is connected")
})


const port = process.env.PORT || 8000

app.listen(port, function(){
    connect()
    console.log(`Serveur en écoute sur le port ${port}`)
})