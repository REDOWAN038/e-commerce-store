const express = require("express")
const { isLoggedIn } = require("../middlewares/auth")
const { handlePlaceOrder, handleGetLoggedUserAllOrders, handleGetSingleOrder, handleMarkOrderAsPaid, handleOrderPaymentIntent } = require("../controllers/orderController")
const router = express.Router()

// place order
router.post("/", isLoggedIn, handlePlaceOrder)

// get logged user all orders
router.get("/", isLoggedIn, handleGetLoggedUserAllOrders)

// get order by id
router.get("/:id", isLoggedIn, handleGetSingleOrder)

// payment intent
router.get("/payment-intent/:id", isLoggedIn, handleOrderPaymentIntent)

// pay order
router.put("/payment/:id", isLoggedIn, handleMarkOrderAsPaid)

module.exports = router