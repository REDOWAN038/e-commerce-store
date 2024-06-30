const express = require("express")
const { handleUserLogin, handleUserLogout } = require("../controllers/authController")
const { isLoggedOut, isLoggedIn } = require("../middlewares/auth")
const { validateUserLogin } = require("../middlewares/validation")
const { runValidation } = require("../middlewares")
const router = express.Router()

// user logged in
router.post("/login", isLoggedOut, validateUserLogin, runValidation, handleUserLogin)

// user logged out
router.post("/logout", isLoggedIn, handleUserLogout)

module.exports = router