import mongoose, { Schema } from "mongoose";


const RequestSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
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
    message: {
        type: String,
    },
    status: {
        type: String,
        enum: ["pending", "accepted", "rejected"],
        default: "pending"
    }

}, {timestamps: true})

const Request = mongoose.model("Request", RequestSchema)
export default Request