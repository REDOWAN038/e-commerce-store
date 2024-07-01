const express = require("express")
const { isLoggedIn, isAdmin } = require("../middlewares/auth")
const { handleGetAllUsers, handleGetUserById, handleDeleteUserById } = require("../controllers/userController")
const router = express.Router()

// get all users
router.get("/", isLoggedIn, isAdmin, handleGetAllUsers)

// get user by id
router.get("/:id", isLoggedIn, isAdmin, handleGetUserById)

// delete user by id
router.delete("/:id", isLoggedIn, isAdmin, handleDeleteUserById)


module.exports = router