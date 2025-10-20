import express from "express"
import User from "../models/User.js"
import bcrypt from "bcryptjs"
import dotenv from "dotenv"
import { createError } from "../utils/error.js"
import jwt from "jsonwebtoken"
dotenv.config()

const router = express.Router()

router.post("/register", async function(req, res, next) {

    const salt = bcrypt.genSaltSync(10)
    const hashedPassword = bcrypt.hashSync(req.body?.password?.trim(), salt)

    try {
        const newUser = new User({
            username: req.body.username?.trim(),
            email: req.body.email?.trim(),
            password: hashedPassword
        })
        const savedUser = await newUser.save()
        res.status(201).json({message: "Vous avez créer votre compte avec succès", data: savedUser})
        
    } catch (err) {
        next(err)
    }
} )

router.post("/login", async function (req, res, next){

    try {
        const user = await User.findOne({username: req.body.username?.trim()})
        if (!user) {
            return next(createError(404, "Cet utilisateur n'existe pas!"))
        }
        const isPasswordCorrect = await bcrypt.compare(req.body.password?.trim() , user.password)
        
        if (!isPasswordCorrect) {
            return next(createError(403, "Votre mot de passe est incorrect"))
        }

        const {isAdmin, password, ...othersDetails} = user._doc 
        const token = jwt.sign({id: user?._id, isAdmin: user?.isAdmin}, process.env.JWT_SECRET_KEY)

        res.cookie("access_token", token, {
            httpOnly: true,
            path: "/",
            sameSite: "none",
            secure: true,
            maxAge: 7*24*60*60*1000
        }).status(201).json({message: "Connecté avec succès", data: othersDetails})
        
    } catch (err) {
        next(err)
    }

})

router.post("/logout", async function (req, res, next){
    try {
        res.clearCookie("access_token").status(200).json({message: "Déconnecté avec succès"})
    } catch (err) {
        next(err)
    }
})


export default router