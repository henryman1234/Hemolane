import mongoose, { Schema } from "mongoose";


const notificationSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User"
    },
    type: {
        type: String,
        required: true,
        default: "ORDER_CREATED"
    },
    priority: {
        type: String,
        required: true,
        enum: ["Moyenne", "Elective", "Immédiate"],
        default: "Moyenne"
    },
    hospital: {
        type: Schema.Types.ObjectId,
        ref: "Hospital",
        required: true
    },
    contact:{
        type: String,
        required: true
    },
    bloodBank: {
        type: Schema.Types.ObjectId,
        required: true
    },
    order: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Order",
        required: true
    },
    message: {
        type: String,
        required: true
    }
    
} , {timestamps: true})


const Notification = mongoose.model("Notification", notificationSchema)
export default Notification