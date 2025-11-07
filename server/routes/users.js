import express from "express"
import { addToSaveList, deleteUser, getAllSaveList, getUser, getUsers, removeFromSaveList, updateUser } from "../controllers/users.js"
import { verifyAdmin, verifyUser } from "../utils/verifyToken.js"

const router = express.Router()

router.get("/checktoken", async function (req, res, next) {
    res.send("Bienvenue utilisateur, vous etes connecté")
})

router.get("/checkadmin", async function (req, res, next) {
    res.send("Bonjour admin, vous etes connecté")
})

// Get All Users
router.get("/", getUsers)
// Get a single user
router.get("/:id",  getUser )
// Update a single user
router.put("/:id",  updateUser)
// Delete a sibngle user
router.delete("/:id",  deleteUser)

// Add a bloodBank to the list
router.post("/:userId/add/:bloodBankId", addToSaveList)

// Remove from the saveList
router.delete("/:userId/remove/:bloodBankId", removeFromSaveList)

// Get All the saveList
router.get("/:userId", getAllSaveList)


export default router