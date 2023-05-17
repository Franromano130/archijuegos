const express = require("express");
const router = express.Router();
const cloudinary = require("cloudinary").v2;

const User = require("../models/User.model.js");
const Games = require("../models/Games.model.js");
const Post = require("../models/Post.model.js");
const capitalize = require("../utils/capitalize.js");
const uploader = require("../middlewares/uploader.js");

router.get("/inicio", (req, res, next) => {
  res.render("body/inicio.hbs");
});

router.post("/inicio", (req, res, next) => {});

router.get("/create-data", (req, res, next) => {
  Games.findById(req.params.gameId)
    .populate("User")
    .then(() => {
      res.render("body/create-data.hbs");
    })
    .catch((err) => {
      next(err);
    });
});

router.post("/create-data", uploader.single("url"), async (req, res, next) => {
  console.log(req.file);
  const { title, description, url, releaseDate, company, creator } = req.body;
  const { _id } = req.session.user;
  if (req.file === undefined) {
    next("No hay imagen");
  }
  try {
    const response = await Games.create({
      title: title,
      description: description,
      url: req.file.path, //aqui es donde cloudinary nos devuelve el url de la img
      releaseDate: releaseDate,
      company: company,
      creator: _id,
    });

    res.redirect("/body/list-games");
  } catch (error) {
    next(error);
  }
});

router.get("/list-games", (req, res, next) => {
  Games.find()
    .select({ title: 1 })
    .then((response) => {
      console.log(response);

      res.render("body/list-games.hbs", {
        allGames: response,
      });
    })
    .catch((error) => {
      next(error);
    });
});

router.get("/list-games/:gameId", async (req, res, next) => {
  try {
    const response = await Games.findById(req.params.gameId);

    response.title = capitalize(response.title);
    res.render("body/details.hbs", {
      singleGame: response,
    });
  } catch (error) {
    next(error);
  }
});

router.get("/edit-games/:gameId", (req, res, next) => {
  const { gameId } = req.params;

  Games.findById(gameId)
    .then((game) => res.render("body/edit-games.hbs", { game }))
    .catch((err) => next(err));
});

router.post("/edit-games/:gameId", (req, res, next) => {
  const { gameId } = req.params;
  console.log("PROBANDO", gameId);

  const { title, description, url, releaseDate, company } = req.body;
  console.log(req.body);

  Games.findByIdAndUpdate(gameId, {
    title,
    description,
    url,
    releaseDate,
    company,
  })

    .then(() => {
      res.redirect("/body/list-games");
    })
    .catch((err) => next(err));
});

router.post("/edit-games/:gameId/delete", (req, res, next) => {
  const { gameId } = req.params;
  console.log("TEST");
  Games.findByIdAndDelete(gameId)
    .then(() => {
      res.redirect("/body/list-games");
    })
    .catch((error) => {
      next(error);
    });
});

//rutas de las publicaciones(los posts)

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

    await Games.findByIdAndUpdate(gameId, { $push: { posts: response._id } });

    res.redirect("/body/post");
  } catch (error) {
    next(error);
  }
});

router.get("/post", (req, res, next) => {
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

module.exports = router;
