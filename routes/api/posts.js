const express = require("express");
const router = express();
const bodyParser = require("body-parser");
const Post = require("../../schemas/PostSchema");
const User = require("../../schemas/UserSchema"); // Import the User schema
const mongoose = require("mongoose");
const sanitizeInput = require("../../utils/sanitizer");

router.use(bodyParser.urlencoded({ extended: false }));

//gets all posts
router.get("/", async (req, res, next) => {
  let results = await getPosts();
  //results = results[0];
  console.log(results);
  res.status(200).send(results);
});

router.get("/:id", async (req, res, next) => {
  let postId = req.params.id;
  let results = await getPosts({ _id: postId });
  res.status(200).send(results);
});
//sends a post
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
//likes and dislikes a post
router.put("/:id/like", async (req, res, next) => {
  let postId = req.params.id;
  let userId = req.session.user._id;

  // Get the user from the database
  let user = await User.findById(userId).catch((error) => {
    console.log(error);
    res.sendStatus(400);
    return; // Ensure that the function doesn't continue executing after an error
  });

  let isLiked = user.likes && user.likes.includes(postId);

  let option = isLiked ? "$pull" : "$addToSet";

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
//retweets a post
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
//gets all posts
async function getPosts(filter) {
  let results = await Post.find(filter)
    .populate("postedBy")
    .populate("retweetData")
    .sort({ createdAt: -1 })
    .catch((error) => {
      console.log(error);
    });
  return await User.populate(results, { path: "retweetData.postedBy" });
}

module.exports = router;
