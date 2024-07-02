const express = require("express")
const { validateCategory } = require("../middlewares/validation")
const { runValidation } = require("../middlewares")
const { isLoggedIn, isAdmin } = require("../middlewares/auth")
const { handleCreateCategory, handleUpdateCategory, handleDeleteCategory } = require("../controllers/categoryController")
const router = express.Router()

// create category
router.post("/", validateCategory, runValidation, isLoggedIn, isAdmin, handleCreateCategory)

// update category
router.put("/:slug", validateCategory, runValidation, isLoggedIn, isAdmin, handleUpdateCategory)

// delete category
router.delete("/:slug", isLoggedIn, isAdmin, handleDeleteCategory)

module.exports = router