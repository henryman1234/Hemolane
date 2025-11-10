import mongoose from "mongoose"

const BloodBankSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,

    },
    desc: {
        type: String,
        required: true
    },
    status: {
        type: String,
        enum: ["disponible", "non-disponible"],
        default: "disponible"
    },
    image: {
        type: [String],
    },
    rhesus: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true
    },
    hospital: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Hospital",
        required: true
    }
}, {timestamps: true})

const BloodBank = mongoose.model("BloodBank", BloodBankSchema)
export default BloodBank