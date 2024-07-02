const express = require("express")
const { upload } = require("../middlewares/uplodeImage")
const { isLoggedIn, isAdmin } = require("../middlewares/auth")
const { validateProduct } = require("../middlewares/validation")
const { runValidation } = require("../middlewares")
const { handleCreateProduct, handleUpdateProduct, handleDeleteProduct } = require("../controllers/productController")
const router = express.Router()

// create product
router.post("/", upload.array("imageFiles", 6), validateProduct, runValidation, isLoggedIn, isAdmin, handleCreateProduct)

// update product
router.put("/:slug", upload.array("imageFiles", 6), isLoggedIn, isAdmin, handleUpdateProduct)

// delete product
router.delete("/:slug", isLoggedIn, isAdmin, handleDeleteProduct)

module.exports = router