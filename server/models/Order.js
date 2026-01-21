import mongoose, { Schema } from "mongoose";


const OrderSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
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
    bloodBank: {
        type: Schema.Types.ObjectId,
        ref: "bloodBank",
        required: true

    },
    contact: {
        required: true,
        type: String
    },
    message: {
        type: String,
        required: true
    },
    status: {
        type: String,
        enum: ["pending", "accepted", "rejected"],
        default: "pending"
    }

}, {timestamps: true})

const Order = mongoose.model("Order", OrderSchema)
export default Order