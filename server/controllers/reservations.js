import express from "express"
import Reservation from "../models/Reservation.js"

export const createReservation = async function (req, res, next) {


    const newReservation = new Reservation({
        blood: req.body.blood,
        rhesus: req.body.rhesus,
        contact: req.body.contact,
        time: req.body.time,
        date: req.body.date,
        author: req.body.author
    })

    const savedReservation = await newReservation.save();
    res.status(200).json({message: "Reservation sent with succès", data: savedReservation})
    try {
        
    } catch (err) {
        next(err)
    }
}

export const getAllReservations = async function (req, res, next) {
    try {
        const reservations = await Reservation.find()
        res.status(200).json({message: "Toutes les reservations", data: reservations})
    } catch (err) {
        next(err)
    }
}

export const deleteReservation = async function (req, res, next) {
    const {id} = req.params

    try {
        await Reservation.findByIdAndDelete(id)
        res.status(200).json({message: "Reservation supprimé avec succès"})
    } catch (err) {
        next(err)
    }
}