const express = require("express")
const { isLoggedIn, isAdmin } = require("../middlewares/auth")
const { handleGetAllOrders, handleMarkOrderAsDelivered, handleGetTotalOrders, handleGetTotalSales, handleGetTotalSalesByDates } = require("../controllers/orderController")
const router = express.Router()

// get all orders
router.get("/", isLoggedIn, isAdmin, handleGetAllOrders)

// get total orders
router.get("/total-orders", isLoggedIn, isAdmin, handleGetTotalOrders)

// get total sales
router.get("/total-sales", isLoggedIn, isAdmin, handleGetTotalSales)

// get total sales by dates
router.get("/total-sales-by-dates", isLoggedIn, isAdmin, handleGetTotalSalesByDates)


// deliver order
router.put("/deliver/:id", isLoggedIn, isAdmin, handleMarkOrderAsDelivered)

module.exports = router