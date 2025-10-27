import mongoose from "mongoose"

const BloodBankSchema = new mongoose.Schema({
    name: {
        required: true,
        type: String
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
    type: {
        type: String,
        required: true
    },
    hospital: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Hospital",
    }
}, {timestamps: true})

const BloodBank = mongoose.model("BloodBank", BloodBankSchema)
export default BloodBank