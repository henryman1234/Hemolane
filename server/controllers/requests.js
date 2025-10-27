import mongoose from "mongoose"
import Request from "../models/Request.js"

export const createRequest = async function (req, res, next) {
    const {hospitalId, bloodBankId, message} = req.body
    const userId = req.user?.id
    try {
        const newRequest = await Request.create({
            hospital: hospitalId,
            bloodBank: bloodBankId,
            user: userId,
            message: message
        })
        res.status(200).json({message: "Demande envoyé avec succès", data: newRequest})
        
    } catch (err) {
        next(err)
    }
}