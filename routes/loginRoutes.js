const express = require("express");
const router = express();
const bodyParser = require("body-parser");
const argon2 = require("argon2");
const User = require("../schemas/UserSchema"); // Import the User schema
const sanitizeInput = require("../utils/sanitizer");

router.set("view engine", "pug");
router.set("views", "views");

router.use(bodyParser.urlencoded({ extended: false }));

router.get("/", (req, res, next) => {
  res.status(200).render("login");
});

router.post("/", sanitizeInput(), async (req, res, next) => {
  let username = req.body.logUsername;
  let password = req.body.logPassword;
  //checks if the user exists
  if (username && password) {
    try {
      var user = await User.findOne({
        $or: [{ username: username }, { email: username }],
      });

      if (!user) {
        res
          .status(200)
          .render("login", { errorMessage: "Invalid username or password" });
      } else {
        // Checks if the password is correct
        const passwordValid = await argon2.verify(user.password, password);
        if (!passwordValid) {
          res
            .status(200)
            .render("login", { errorMessage: "Invalid username or password" });
        } else {
          // Password is valid, set user as session
          req.session.user = user;
          return res.redirect("/");
        }
      }
    } catch (err) {
      console.log(err);
      res
        .status(200)
        .render("login", { errorMessage: "Something went wrong." });
    }
  } else {
    res.status(200).render("login", {
      errorMessage: "Please enter both username and password.",
    });
  }
});

module.exports = router;
