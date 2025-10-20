import express from "express"
import { deleteUser, getUser, getUsers, updateUser } from "../controllers/users.js"
import { verifyAdmin, verifyUser } from "../utils/verifyToken.js"

const router = express.Router()

router.get("/checktoken", async function (req, res, next) {
    res.send("Bienvenue utilisateur, vous etes connecté")
})

router.get("/checkadmin", async function (req, res, next) {
    res.send("Bonjour admin, vous etes connecté")
})

router.get("/", verifyAdmin, getUsers)
router.get("/:id", verifyUser, getUser )
router.put("/:id", verifyUser, updateUser)
router.delete("/:id", verifyUser, deleteUser)

export default router