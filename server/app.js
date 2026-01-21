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
import bloodBanksRoute from "./routes/bloodBanks.js";
import notificationsRoute from "./routes/notifications.js"
import ordersRoute from "./routes/orders.js";
import reservationsRoute from "./routes/reservations.js"
import { initSocket } from "./utils/socket.js"
import {createServer} from "http"

// Initialise express
const app = express()
const port = process.env.PORT || 8000




// Middlewares

/**
 * That's the cors's configuration to avoid unknown origins
 */
const allowedOrigins = [
    "http://localhost:5173",
    "http://localhost:5174",
    "https://hemolane-admin.vercel.app",
    "https://hemolane-front.vercel.app"
]
const corsOptions = {
    origin: function (origin, callback) {
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true)
        } else {
            callback(new Error("Origine non-authorisé"), false)
        }
    },
    methods: "GET, PUT, DELETE, PATCH, POST",
    optionSuccessStatus: 204,
    credentials: true,
    allowedHeaders: ["Content-Type", "Authorization"]
}


app.use(cors(corsOptions))

app.use(cookieParser())
app.use(morgan("dev"))
app.use(express.json())


// Routes for the API
app.use("/api/users", usersRoute)
app.use("/api/auth", authRoute)
app.use("/api/bloodBanks", bloodBanksRoute)
app.use("/api/hospitals", hospitalsRoute)
app.use("/api/orders", ordersRoute)
app.use("/api/notifications", notificationsRoute)
app.use("/api/reservations", reservationsRoute)


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


// Création du socket
const httpServer = createServer(app)
export const io = initSocket(httpServer)

// Rendre l'instance "io" publique
app.set("io", io)


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

app.get("/", function(req, res){
    res.send("Bonjour les gens")
})

httpServer.listen(port, function(){
    connect()
    console.log(`Serveur en écoute sur le port ${port}`)
})