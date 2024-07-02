const express = require("express")
const { handleGetAllProducts, hanldeGetSingleProduct } = require("../controllers/productController")
const router = express.Router()

// get all products
router.get("/", handleGetAllProducts)

// get single product
router.get("/:slug", hanldeGetSingleProduct)

module.exports = router