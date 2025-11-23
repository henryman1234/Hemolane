import express from "express"
import multer from "multer"

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, "uploads/")
    },
    filename: function(req, file, cb) {
        const uniqueSuffixe = Date.now() + "-"+ Math.round(Math.random*1E9)
        console.log(uniqueSuffixe)
        cb(null, uniqueSuffixe + file?.originalname)
    }
})

export const upload = multer({
    destination: storage,
    limits: {
        fileSize: 3*1024*1024
    }
})