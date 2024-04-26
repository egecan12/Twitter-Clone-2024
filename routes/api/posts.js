const express = require("express");
const router = express();
const bodyParser = require("body-parser");
const Post = require("../../schemas/PostSchema");
const User = require("../../schemas/UserSchema"); // Import the User schema
const mongoose = require("mongoose");
const sanitizeInput = require("../../utils/sanitizer");

router.use(bodyParser.urlencoded({ extended: false }));

router.get("/", (req, res, next) => {
  let userId = req.session.user._id;
  let userPosts = Post.find({ postedBy: userId })
    .populate("postedBy")
    .sort({ createdAt: -1 })
    .then((userPosts) => {
      res.status(200).send(userPosts);
    })
    .catch((error) => {
      console.log(error);
      res.sendStatus(500);
    });
});

router.post("/", sanitizeInput(), (req, res, next) => {
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

router.put("/:id/like", async (req, res, next) => {
  console.log(req.params.id);

  let postId = req.params.id;
  let userId = req.session.user._id;

  // Get the user from the database
  let user = await User.findById(userId).catch((error) => {
    console.log(error);
    res.sendStatus(400);
    return; // Ensure that the function doesn't continue executing after an error
  });

  let isLiked = user.likes && user.likes.includes(postId);

  console.log("is liked " + isLiked);

  let option = isLiked ? "$pull" : "$addToSet";

  console.log("opt: " + option);

  //insert user like

  await User.findByIdAndUpdate(
    userId,
    {
      [option]: { likes: postId },
    },
    { new: true }
  ).catch((error) => {
    console.log(error);
    res.sendStatus(400);
  });

  //insert post like

  let post = await Post.findByIdAndUpdate(
    postId,
    {
      [option]: { likes: userId },
    },
    { new: true }
  ).catch((error) => {
    console.log(error);
    res.sendStatus(400);
  });

  res.status(200).send(post);
});

router.post("/:id/retweet", async (req, res, next) => {
  // console.log(req.params.id);

  let postId = req.params.id;
  let userId = req.session.user._id;

  //Trys and deletes retweet

  let deletedPost = await Post.findOneAndDelete({
    postedBy: userId,
    retweetData: postId,
  }).catch((error) => {
    console.log(error);
    res.sendStatus(400);
    return; // Ensure that the function doesn't continue executing after an error
  });

  let option = deletedPost != null ? "$pull" : "$addToSet";

  let repost = deletedPost;

  if (repost == null) {
    repost = await Post.create({
      postedBy: userId,
      retweetData: postId,
    }).catch((error) => {
      console.log(error);
      res.sendStatus(400);
      return; // Ensure that the function doesn't continue executing after an error
    });
  }
  //insert user like

  await User.findByIdAndUpdate(
    userId,
    {
      [option]: { retweets: repost._id },
    },
    { new: true }
  ).catch((error) => {
    console.log(error);
    res.sendStatus(400);
  });

  //insert post like

  let post = await Post.findByIdAndUpdate(
    postId,
    {
      [option]: { retweetUsers: userId },
    },
    { new: true }
  ).catch((error) => {
    console.log(error);
    res.sendStatus(400);
  });

  res.status(200).send(post);
});

module.exports = router;
