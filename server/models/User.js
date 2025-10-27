import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    email : {
        type: String,
        required: true,
        unique: true
    },
    avatarUrl: {
        type: String,
        default: ""
    },
    status: {
        type: String,
        default: "active"
    },
    password: {
        type: String,
        required: true,
        unique: true
    },
    isAdmin: {
        type: Boolean,
        default: false
    },
    saveList: [{type: mongoose.Schema.Types.ObjectId, ref: "BloodBank"}]

}, {timestamps: true})

const User = mongoose.model("User", UserSchema)

export default User