const express = require("express");
const router = express();
const bodyParser = require("body-parser");

router.use(bodyParser.urlencoded({ extended: false }));

router.get("/"),
  (req, res, next) => {
    if (req.session) {
      req.session.destroy(() => {
        res.redirect("/login");
        return res.end();
      });
    }
  };

module.exports = router;
