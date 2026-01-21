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
    avatarUrl: {
        type: String,
        default: ""
    },
    phone1: {
        type: String,
        required: true
    },
    phone2: {
        type: String,
        required: true
    },
    
    lng: {type: Number},
    lat: {type: Number},

    address: {
        type: String,
        required: true 
    },
    bloodBanks: [{type: mongoose.Schema.Types.ObjectId, ref: "BloodBank"}]

    
}, {timestamps: true})

const Hospital = mongoose.model("Hospital", HospitalSchema)
export default Hospital