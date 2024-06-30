const express = require("express")
const { isLoggedOut, isLoggedIn } = require("../middlewares/auth")
const { validateUserRegistration } = require("../middlewares/validation")
const { runValidation } = require("../middlewares")
const { handleUserRegister, handleGetUser, handleUpdateUser } = require("../controllers/userController")
const router = express.Router()

// register an user
router.post("/register", isLoggedOut, validateUserRegistration, runValidation, handleUserRegister)

// get user
router.get("/", isLoggedIn, handleGetUser)

// update user
router.put("/", isLoggedIn, handleUpdateUser)

module.exports = router