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


// Get A Single User
router.get("/:id", getUser)


// Get All Users
router.get("/", getUsers)

// Update a single user
router.put("/:id",  updateUser)
// Delete a sibngle user
router.delete("/:id",  deleteUser)

// Add a bloodBank to the list
router.post("/:userId/add/:bloodBankId", addToSaveList)

// Remove from the saveList
router.delete("/:userId/remove/:bloodBankId", removeFromSaveList)

// Get A single User with All the saveList
router.get("/:userId/saveList", getAllSaveList)


export default router