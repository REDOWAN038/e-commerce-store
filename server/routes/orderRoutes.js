const express = require("express")
const { isLoggedIn } = require("../middlewares/auth")
const { handlePlaceOrder, handleGetLoggedUserAllOrders, handleGetTotalOrders, handleGetTotalSales, handleGetTotalSalesByDates, handleGetSingleOrder, handleMarkOrderAsPaid } = require("../controllers/orderController")
const router = express.Router()

// place order
router.post("/", isLoggedIn, handlePlaceOrder)

// get logged user all orders
router.get("/", isLoggedIn, handleGetLoggedUserAllOrders)

// get total orders
router.get("/total-orders", handleGetTotalOrders)

// get total sales
router.get("/total-sales", handleGetTotalSales)

// get total sales by dates
router.get("/total-sales-by-dates", handleGetTotalSalesByDates)

// get order by id
router.get("/:id", isLoggedIn, handleGetSingleOrder)

// pay order
router.put("/payment/:id", isLoggedIn, handleMarkOrderAsPaid)

module.exports = router