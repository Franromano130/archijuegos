const express = require("express");
const router = express.Router();
const cloudinary = require("cloudinary").v2;

const User = require("../models/User.model.js");
const Games = require("../models/Games.model.js");
const Post = require("../models/Post.model.js");
const capitalize = require("../utils/capitalize.js");
const uploader = require("../middlewares/uploader.js");

router.get("/form-post/:gameId", (req, res, next) => {
  const { gameId } = req.params;
  Games.findById(gameId)
    .then((gameData) => {
      res.render("body/form-post.hbs", {
        gameData,
      });
    })
    .catch((error) => {
      next(error);
    });
});

router.post("/form-post/:gameId", async (req, res, next) => {
  const { title, description } = req.body;
  const { _id } = req.session.user;
  const { gameId } = req.params;

  console.log("alv1", req.body);
  try {
    const response = await Post.create({
      games: gameId,
      title: title,
      description: description,
      author: _id,
    });
    console.log("NOTIFICACION", response);
    await Games.findByIdAndUpdate(gameId, { $push: { posts: response._id } });
    // darle una vuelta a esta funcion de aqui arriba
    const postId = response._id;
    res.redirect(`/body/post/${postId}`);
  } catch (error) {
    next(error);
  }
});

router.get("/post-list", (req, res, next) => {
  Post.find()
    .select()
    .then((response) => {
      console.log(response);

      res.render("body/post-list.hbs", {
        allPost: response,
      });
    })
    .catch((error) => {
      next(error);
    });
});

router.get("/post/:postId", (req, res, next) => {
  const response = Post.findById(req.params.postId)

    .then(() => {
      res.render("body/post.hbs", {
        singlePost: response,
      });
    })
    .catch((error) => {
      next(error);
    });
});

router.get("/edit-post/:postId", (req, res, next) => {
  const { postId } = req.params;

  Post.findById(postId)
    .then((post) => res.render("body/edit-posts.hbs", { post }))
    .catch((err) => next(err));
});

router.post("/edit-posts/:postId", (req, res, next) => {
  const { postId } = req.params;
  console.log("PROBANDO", postId);

  const { title, description } = req.body;
  console.log(req.body);

  Post.findByIdAndUpdate(gameId, {
    title,
    description,
  })

    .then(() => {
      res.redirect("/body/post-list");
    })
    .catch((err) => next(err));
});

module.exports = router;
