const { body } = require("express-validator")

// validate user registration input
const validateUserRegistration = [
    body("name")
        .trim()
        .notEmpty()
        .withMessage("Name is required"),

    body("email")
        .trim()
        .notEmpty()
        .withMessage("Email is required")
        .isEmail()
        .withMessage("Emails is not valid"),

    body("password")
        .trim()
        .notEmpty()
        .withMessage("Pasword is required")
]


// validate user login input
const validateUserLogin = [
    body("email")
        .trim()
        .notEmpty()
        .withMessage("Email is required")
        .isEmail()
        .withMessage("Emails is not valid"),

    body("password")
        .trim()
        .notEmpty()
        .withMessage("Pasword is required")
]

// validate category
const validateCategory = [
    body("name")
        .trim()
        .notEmpty()
        .withMessage("category name is required"),
]

// validate product
const validateProduct = [
    body("name")
        .trim()
        .notEmpty()
        .withMessage("product name is required"),
    body("brand")
        .trim()
        .notEmpty()
        .withMessage("product brand is required"),
    body("description")
        .trim()
        .notEmpty()
        .withMessage("product description is required"),
    body("price")
        .notEmpty()
        .withMessage("Product price is required")
        .isNumeric()
        .withMessage("Price must be a numeric value")
        .isFloat({ min: 0 })
        .withMessage("Price must be a non-negative value"),
    body("quantity")
        .notEmpty()
        .withMessage("Product quantity is required")
        .isNumeric()
        .withMessage("Quantity must be a numeric value")
        .isFloat({ min: 0 })
        .withMessage("Quantity must be a non-negative value"),
    body("sold")
        .optional()
        .isNumeric()
        .withMessage("Sold must be a numeric value")
        .isFloat({ min: 0 })
        .withMessage("Sold must be a non-negative value"),
    body("category")
        .trim()
        .notEmpty()
        .withMessage("Category is required")
]

module.exports = {
    validateUserRegistration,
    validateUserLogin,
    validateCategory,
    validateProduct
}