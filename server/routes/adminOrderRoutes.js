const express = require("express")
const { isLoggedIn, isAdmin } = require("../middlewares/auth")
const { handleGetAllOrders, handleMarkOrderAsDelivered } = require("../controllers/orderController")
const router = express.Router()

// get all orders
router.get("/", isLoggedIn, isAdmin, handleGetAllOrders)

// deliver order
router.put("/deliver/:id", isLoggedIn, isAdmin, handleMarkOrderAsDelivered)

module.exports = router