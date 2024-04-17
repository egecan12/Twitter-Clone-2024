const express = require("express");
const router = express.Router();
const app = express();
const bodyParser = require("body-parser");
const User = require("../schemas/UserSchema"); // Import the User schema

app.set("view engine", "pug");
app.set("views", "views");

app.use(bodyParser.urlencoded({ extended: false }));

router.get("/", (req, res, next) => {
  res.status(200).render("register");
});

router.post("/", (req, res, next) => {
  let firstName = req.body.firstName.trim();
  let lastName = req.body.lastName.trim();
  let username = req.body.username.trim();
  let email = req.body.email.trim();
  let password = req.body.password;

  let payload = req.body;

  if (firstName && lastName && username && email && password) {
    User.findOne({ $or: [{ username: username }, { email: email }] })
      .then((existingUser) => {
        if (existingUser) {
          // User already exists
          payload.errorMessage = "Username or email already exists.";
          res.status(200).render("register", payload);
        } else {
          // User doesn't exist, create a new user
          let user = new User({
            firstName: firstName,
            lastName: lastName,
            username: username,
            email: email,
            password: password,
          });

          user
            .save()
            .then(() => {
              console.log("User saved successfully.");
              res.redirect("/login");
            })
            .catch((err) => {
              console.log(err);
              payload.errorMessage = "Something went wrong.";
              res.status(200).render("register", payload);
            });
        }
      })
      .catch((err) => {
        console.log(err);
        payload.errorMessage = "Something went wrong.";
        res.status(200).render("register", payload);
      });
  } else {
    payload.errorMessage = "Not all the fields has a value ";
    res.status(200).render("register", payload);
  }
});

module.exports = router;
