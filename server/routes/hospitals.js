import mongoose from "mongoose";
import express from "express"
import { createBloodBank, createHospital, deleteBloodBank, deleteHospitalAndBanks, getHospital, getHospitals, updateBloodBank, updateHospital } from "../controllers/hospitals.js";

const router = express.Router()

// Get all the hospitals
router.get("/", getHospitals)
// Create an hospital
router.post("/", createHospital)

// Get a specific hospital
router.get("/:id", getHospital)

// Update an Hospital
router.put("/:id", updateHospital)

// Delete An hospital with all his bloodBanks
router.delete("/:id", deleteHospitalAndBanks)

// Create an BloodBank for an Hospital
router.post("/:id/bloodBank", createBloodBank)

// Delete a bloodbank from an hospital
router.delete("/:hospitalId/bloodBank/:bloodBankId", deleteBloodBank)

// upadate a bloodBank from an hospital
router.put("/:hospitalId/bloodBank/:bloodBankId", updateBloodBank)


export default router