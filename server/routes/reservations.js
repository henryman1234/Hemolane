import express from "express"
import { verifyToken, verifyUser } from "../utils/verifyToken.js"
import { createReservation, deleteReservation, getAllReservations } from "../controllers/reservations.js"

const router = express.Router()

router.post("/", verifyToken, createReservation)
router.get("/", verifyToken, getAllReservations)
router.delete("/:id", verifyToken, deleteReservation )


export default router