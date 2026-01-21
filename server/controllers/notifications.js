import express from "express"
import mongoose from "mongoose"
import Notification from "../models/Notification.js"

// Get all Orrders
export const getAllNotifications = async function (req, res, next) {
    try {
        const allNotifications = await Notification.find()
            .populate("user", "username email avatarUrl")
            .populate("hospital", "name" )
            .populate("order", "bloodBank")

        res.status(200).json({message:  "Toutes les notifications", data: allNotifications})

        console.log(allNotifications)
        
    } catch (err) {
        next(err)
    }
}


//Delete a Notification
export const deleteNotification = async function (req, res, next) {
    const {id} = req.params
    console.log("ID de la notification:", id)

    try {
        await Notification.findByIdAndDelete(id)
        res.status(200).json({message: "Notification supprimé avec succès"})
    } catch (err) {
        next(err)
    }
}