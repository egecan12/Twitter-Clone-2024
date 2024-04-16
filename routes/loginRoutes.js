const express = require("express");
const router = express();

router.set("view engine", "pug");
router.set("views", "views");

router.get("/", (req, res, next) => {
  res.status(200).render("login");
});

module.exports = router;
