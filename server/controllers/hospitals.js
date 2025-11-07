import mongoose from "mongoose";
import Hospital from "../models/Hospital.js"
import BloodBank from "../models/BloodBank.js";
import { createError } from "../utils/error.js";


export const createHospital = async function (req, res, next) {
    try {
        const newHospital = new Hospital({
            name: req.body?.name,
            city: req.body?.city,
            address: req.body?.address,
            lng: req.body?.lng,
            lat: req.body?.lat
        })

        const savedHospital = await newHospital.save()
        res.status(200).json({message: "Hopital créer avec succès", data: savedHospital})
    } catch (err) {
        next(err)
    }
}
 

export const getHospitals = async function (req, res, next) {
    try {
        const hospitals = await Hospital.find()
        res.status(200).json({message: "Hopitaux en général", data: hospitals})
    } catch (err) {
        next(err)
    }
}

export const getHospital = async function (req, res, next) {
    const id = req.params.id
    try {
        const hospital = await Hospital.findById(id)
        res.status(200).json({message: "Hopital", data: hospital})
    } catch (err) {
        next(err)
    }
}

export const updateHospital = async function (req, res, next) {

    const id = req.params.id

    try {
        const updatedHospital = await Hospital.findByIdAndUpdate(id, {$set: req.body}, {new: true})
        res.status(200).json({message: "Mis à jour avec succès" ,data: updatedHospital})
    } catch (err) {
        next(err)
    }
}

// Delete an hospital with his bloodBanks
export const deleteHospitalAndBanks = async function (req, res, next) {

    const id = req.params.id
    try {

        const hospital = await Hospital.findById(id)
        if (!id) {
            return next(createError(404, "Cette Hopital n'existe pas!"))
        }
        
        // Supprimer toutes les banques de sang de ce hopital
        const deletedBanks = await BloodBank.deleteMany({hospital: id})

        await Hospital.findByIdAndDelete(id)
        
        res.status(200).json({
            message: "Hopital supprimé avec succès!",
            deletedBanksCount: deletedBanks.deletedCount
        })
    } catch (err) {
        next(err)
    }
}


// Create an Bloodbank
export const createBloodBank  = async function (req, res, next) {
    const hospitalId = req.params.id

    const newBloodBank = new BloodBank({
        name: req.body.name,
        type: req.body.type,
        desc: req.body.desc,
        hospital: hospitalId
    })

    try {
        // We first create the bloodBank
        const savedBloodBank = await newBloodBank.save()

        // Then we update the current hospital
        await Hospital.findByIdAndUpdate(hospitalId, {$push: {bloodBanks: savedBloodBank?._id}}, {new: true})


        res.status(200).json({message: "Banque de sang créer avec succès", data: savedBloodBank})
        
    } catch (err) {
        next(err)
    }
}


// Delete an Bloodbank
export const deleteBloodBank = async function (req, res, next) {

    const {hospitalId, bloodBankId} = req.params

    try {

        // We first delete the bloodBank from the database
        await BloodBank.findByIdAndDelete(bloodBankId)

        // Then we update the hospital
        await Hospital.findByIdAndUpdate(hospitalId, {$pull: {bloodBanks: bloodBankId}}, {new: true})

        res.status(200).json({message: "Banque de sang supprimée avec succès"})
        
    } catch (err) {
        next(err)
    }
}

// upadate a bloodbank from an hospital
export const updateBloodBank = async function (req, res, next) {

    const {hospitalId, bloodBankId} = req.params
    console.log(hospitalId, bloodBankId)
    const {name, type, desc} = req.body

    try {
         // Find the existing bloodBank
        const bloodBank = await bloodBank.findById(bloodBankId)
        if (!bloodBank) {
            return next(createError(404, "Cette banque de sang n'existe pas!"))
        }

        // update BloodBank infos
        if (name, type, desc) {
            bloodBank.name = name
            bloodBank.desc = desc
            bloodBank.type = type
        }

        const updatedBloodBank = await BloodBank.save()

        // Check if the current hosptial exists
        const hospital = await Hospital.findById(hospitalId)
        if (!hospital) {
            return next(createError(404, "Cet hospital n'existe pas"))
        }

        if (!hospital.bloodBanks.includes(bloodBankId)) {
            hospital.bloodBanks.push(bloodBankId)
            await Hospital.save()
        }


        // Then we update the hospital
        res.status(200).json({message: "Banque de sang mis à jour avec succès", data: updatedBloodBank})
        
    } catch (err) {
        next(err)
    }
}