import express from "express"
import { verifyToken } from "../utils/verifyToken.js"
import { createOrder } from "../controllers/orders.js"

const router = express.Router()

router.post("/:bloodBankId/orders/:hospitalId",verifyToken, createOrder)

export default router