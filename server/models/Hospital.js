import mongoose, {Schema} from "mongoose";

const HospitalSchema = new Schema({

    name: {
        type: String,
        required: true
    },
    city: {
        required: true,  
        type: String
    },
    phone: {
        type: [String],
        default: []
    },
    lng: {type: String},
    lat: {type: String},

    address: {
        type: String,
        required: true 
    },
    bloodBanks: [{type: mongoose.Schema.Types.ObjectId, ref: "BloodBank"}]

    
}, {timestamps: true})

const Hospital = mongoose.model("Hospital", HospitalSchema)
export default Hospital