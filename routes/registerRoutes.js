const express = require("express");
const router = express.Router();
const app = express();
const bodyParser = require("body-parser");

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
  } else {
    payload.errorMessage = "Not all the fields has a value ";
    res.status(200).render("register", payload);
  }

  res.status(200).render("register");
});

module.exports = router;
