import mongoose from "mongoose";


const ReservationSchema = new mongoose.Schema({
    blood: {
        type: String,
        required: true,
        enum: ["A+", "B+", "B-", "AB+", "AB-", "O+", "O-", "A-"]
    },
    rhesus: {
        type: String,
        required: true,
        enum: ["Positif", "Négatif"]
    },
    date: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true
    },
    contact: {
        type: String,
        required: true
    },
    time: {
        type: String,
        required: true
    }
}, {timestamps: true})


const Reservation = mongoose.model("Reservation", ReservationSchema)
export default Reservation