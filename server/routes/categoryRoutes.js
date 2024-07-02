const express = require("express")
const { handleGetAllCategories, handleGetCategory } = require("../controllers/categoryController")
const router = express.Router()

// get categories
router.get("/", handleGetAllCategories)

// get category
router.get("/:slug", handleGetCategory)

module.exports = router