import mongoose from "mongoose";
import express from "express"
import { verifyToken } from "../utils/verifyToken.js";
import { deleteNotification, getAllNotifications } from "../controllers/notifications.js";

const router = express.Router()

router.get("/", verifyToken, getAllNotifications)
router.delete("/:id", verifyToken, deleteNotification)


export default router