const { body } = require("express-validator");
const sanitize = require("mongo-sanitize");

// Function to sanitize and validate user input
function sanitizeInput() {
  return [
    body("username")
      .customSanitizer((value) => {
        return sanitize(value);
      })
      .trim()
      .escape()
      .isLength({ min: 1 })
      .withMessage("Username must not be empty"),
    body("email")
      .customSanitizer((value) => {
        return sanitize(value);
      })
      .trim()
      .escape()
      .isEmail()
      .withMessage("Email must be a valid email address"),
    body("password")
      .customSanitizer((value) => {
        return sanitize(value);
      })
      .trim()
      .isLength({ min: 8 })
      .withMessage("Password must be at least 8 characters long"),
    body("firstName")
      .customSanitizer((value) => {
        return sanitize(value);
      })
      .trim()
      .escape()
      .isLength({ min: 1 })
      .withMessage("First name must not be empty"),
    body("lastName")
      .customSanitizer((value) => {
        return sanitize(value);
      })
      .trim()
      .escape()
      .isLength({ min: 1 })
      .withMessage("Last name must not be empty"),
    body("confirmpassword")
      .customSanitizer((value) => {
        return sanitize(value);
      })
      .trim()
      .isLength({ min: 8 })
      .withMessage("Confirm password must be at least 8 characters long"),
    body("title")
      .customSanitizer((value) => {
        return sanitize(value);
      })
      .trim()
      .escape()
      .isLength({ min: 1 })
      .withMessage("Title must not be empty"),
    body("content")
      .customSanitizer((value) => {
        return sanitize(value);
      })
      .trim()
      .escape()
      .isLength({ min: 1 })
      .withMessage("Content must not be empty"),
    // Add more fields as needed
  ];
}

module.exports = sanitizeInput;
