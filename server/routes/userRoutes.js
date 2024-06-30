const express = require("express")
const { isLoggedOut } = require("../middlewares/auth")
const { validateUserRegistration } = require("../middlewares/validation")
const { runValidation } = require("../middlewares")
const { handleUserRegister } = require("../controllers/userController")
const router = express.Router()

// register an user
router.post("/register", isLoggedOut, validateUserRegistration, runValidation, handleUserRegister)

module.exports = router