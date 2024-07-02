const express = require("express")
const { handleGetAllProducts, hanldeGetSingleProduct, handleAddReview, handleGetTopProducts, handleGetNewProducts } = require("../controllers/productController")
const { isLoggedIn } = require("../middlewares/auth")
const router = express.Router()

// get all products
router.get("/", handleGetAllProducts)

// get top products
router.get("/top-rated", handleGetTopProducts)

// get new products
router.get("/new", handleGetNewProducts)

// get single product
router.get("/:slug", hanldeGetSingleProduct)

// add review
router.post("/review/:slug", isLoggedIn, handleAddReview)

module.exports = router