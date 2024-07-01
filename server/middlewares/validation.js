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

module.exports = {
    validateUserRegistration,
    validateUserLogin,
    validateCategory
}