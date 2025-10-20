import express from "express"
import User from "../models/User.js"


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

