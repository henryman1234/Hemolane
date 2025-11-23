import express from "express"
import { getBloodBank, getBloodBanks} from "../controllers/bloodBanks.js"

const router = express.Router()

router.get("/", getBloodBanks)
router.get("/:id", getBloodBank)

export default router