require("dotenv").config();
const express = require("express");
const app = express();
const port = process.env.PORT || 5000;
const middleware = require("./middleware");
const path = require("path");
const bodyParser = require("body-parser");
const mongoose = require("./databaseConnection");
const session = require("express-session");

const PORT = process.env.PORT || 5000;
const HOST = process.env.HOST || "127.0.0.1";

const server = app.listen(PORT, HOST, () => {
  console.log(`Server is listening on ${HOST}:${PORT}`);
});

app.set("view engine", "pug");
app.set("views", "views");

app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static(path.join(__dirname, "public")));

//Sessions

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: true,
    saveUninitialized: false,
  })
);

//Routes
const loginRoute = require("./routes/loginRoutes");
const registerRoute = require("./routes/registerRoutes");
const logoutRoute = require("./routes/logoutRoutes");
//Api Routes
const postsApiRoute = require("./routes/api/posts");

app.use("/login", loginRoute);
app.use("/register", registerRoute);
app.use("/logout", logoutRoute);

app.use("/api/posts", postsApiRoute);

app.get("/", middleware.requireLogin, (req, res, next) => {
  var payload = {
    pageTitle: "Home",
    isUserLoggedIn: req.session.user,
    isUserLoggedInJs: JSON.stringify({
      _id: req.session.user._id,
      username: req.session.user.username,
    }),
  };
  res.status(200).render("home", payload);
});
