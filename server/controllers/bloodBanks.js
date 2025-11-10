import mongoose from "mongoose";
import BloodBank from "../models/BloodBank.js";
import Hospital from "../models/Hospital.js";

export const getBloodBanks = async function (req, res, next) {

    const query = req?.query
    console.log(query)

    try {
        const bloodBanks = await BloodBank.find()
            .populate("hospital", "name address")

        
        res.status(200).json({message: "Toutes les banques de sang", data: bloodBanks})
    } catch (err) {
        next(err)
    }
}

export const getBloodBank = async function (req, res, next) {
    const id = req.params.id
    try {
        const bloodBank = await BloodBank.findById(id)
            .populate("hospital", "name address")
        res.status(200).json({message: "Banque de sang", data: bloodBank})
    } catch (err) {
        next(err)
    }
}

