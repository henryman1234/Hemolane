import express from "express"
import User from "../models/User.js"
import { createError } from "../utils/error.js"
import BloodBank from "../models/BloodBank.js"


export const getUsers = async function (req, res, next) {
    try {
        const users = await User.find()
        res.status(200).json({message: "Succès", data: users})
    } catch (err) {
        next(err)
    }
}

export const getUser = async function (req, res, next) {

    const id = req.params.id
    try {
        const user = await User.findById(id)
        res.status(200).json({message: "Succès", data: user})    
    } catch (err) {
        next(err)
    }
}

export const updateUser = async function (req, res, next) {
    const id = req.params.id

    try {
        const updatedUser = await User.findByIdAndUpdate(id, {$set: req.body}, {new: true})
        res.status(200).json({message: "Mis à jours avec succès!", data: updatedUser})
    } catch (err) {
        next(err)
    }
}

export const deleteUser = async function (req, res, next) {
    const id = req.params.id
    try {
        await User.findByIdAndDelete(id)
        res.status(200).json({message: "Supprimé avec succès"})
    } catch (err) {
        next(err)
    }
}

// Add a bloodbank to the list
export const addToSaveList = async function (req, res, next) {

    const {userId, bloodBankId} = req.params

    try {

        const user = await User.findById(userId)
        if (!user) {
            return next(createError(404, "Cet utilisateur n'existe pas!"))
        }

        const bloodBank = await BloodBank.findById(bloodBankId)
        
        if (!bloodBank) {
            return next(createError(404, "Cette banque de sang n'existe pas!"))
        }

        if (user.saveList.includes(bloodBankId)) {
            return next(createError(403, "Cette banque de sang existe déjà"))
        }

        user.saveList.push(bloodBankId)
        await user.save()

        res.status(200).json({
            message: "Ajouté avec succès",
            data: user.saveList
        })
    } catch (err) {
        next(err)
    }
}

// Remove the bloodBank from the saveList

export const removeFromSaveList = async function (req, res, next) {

    const {userId, bloodBankId} = req.params


    try {

        const user = await User.findById(userId)
        if (!user) {
            return next(createError(404, "Utilisateur introuvable"))
        }

        user.saveList = user.saveList.filter(function(item){
            return item?._id !== bloodBankId
        })

        await user.save();

        res.status(200).json({
            message: "supprimé avec succès",
            lenght: user.saveList.lenght,
            data: user.saveList
        })
        
    } catch (err) {
        next(err)
    }
} 


//Get all the bloodBanks from the savelist for a user
export const getAllSaveList = async function (req, res, next) {

    const {userId} = req.params

    try {

        const user = await User.findById(userId).populate("saveList")
        if (!user) {
            return next(createError(404, "cet utilisateur n'existe pas"))
        }

        res.status(200).json({
            success: true,
            count: user.saveList.length,
            data: user.saveList,
            message: "Toutes les commandes"
        })
        
    } catch (err) {
        next(err)
    }
} 

