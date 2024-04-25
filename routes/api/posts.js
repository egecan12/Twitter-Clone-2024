const express = require("express");
const router = express();
const bodyParser = require("body-parser");
const Post = require("../../schemas/PostSchema");
const User = require("../../schemas/UserSchema"); // Import the User schema

router.use(bodyParser.urlencoded({ extended: false }));

router.get("/", (req, res, next) => {
  let userId = req.session.user._id;
  let userPosts = Post.find({ postedBy: userId })
    .populate("postedBy")
    .then((userPosts) => {
      res.status(200).send(userPosts);
    })
    .catch((error) => {
      console.log(error);
      res.sendStatus(500);
    });
});

router.post("/", (req, res, next) => {
  if (!req.body.content) {
    console.log("content param has not been sent with the request");
    return res.status(400);
  }
  let postData = {
    content: req.body.content,
    postedBy: req.session.user,
  };

  Post.create(postData)
    .then(async (newPost) => {
      newPost = await Post.populate(newPost, { path: "postedBy" });
      res.status(201).send(newPost);
    })
    .catch((error) => {
      console.log(error);
      res.sendStatus(400);
    });
});

module.exports = router;
