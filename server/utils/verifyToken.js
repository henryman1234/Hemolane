import mongoose from "mongoose";
import jwt from "jsonwebtoken"
import { createError } from "./error.js";
import dotenv from "dotenv"
dotenv.config

export const verifyToken = async function (req, res, next) {
    try {
        const token = req.cookies?.access_token
        if (!token) {
            return next(createError(400, "Désolé, cet utilisateur n'existe pas!"))
        }

        jwt.verify(token, process.env.JWT_SECRET_KEY, function(err, user){
            if (err) {
               return next(createError(404, "Token non valide!"))
            }
            req.user = user
            return next()
        })
    } catch (err) {
        return next(err)
    }
}

// USER + ADMIN 
export const verifyUser = async function (req, res, next) {
    try {
        verifyToken(req, res, function() {

            if (req.params.id === req?.user?.id || req.user?.isAdmin) {
                return next()
            } else {
                return next(createError(403, "Vous n'etes pas autorisé"))
            }
        })
    } catch (err) {
        return next(err)
    }
}

// ADMIN
export const verifyAdmin = async function (req, res, next) {
    try {
        verifyToken(req, res, function(){
            if (req?.user?.isAdmin) {
                return next()
            } else  {
                return next(createError(404, "Désolé, vous n'etes pas administrateur"))
            }
        })
    } catch (err) {
        return next(err)
    }
}