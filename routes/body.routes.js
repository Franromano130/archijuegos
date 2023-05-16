const express = require("express");
const router = express.Router();

const User = require("../models/User.model.js");
const Games = require("../models/Games.model.js");
const Post = require("../models/Post.model.js");
const capitalize = require("../utils/capitalize.js");

router.get("/inicio", (req, res, next) => {
  res.render("body/inicio.hbs");
});

router.post("/inicio", (req, res, next) => {});

router.get("/create-data", (req, res, next) => {
  res.render("body/create-data.hbs");
});

router.post("/create-data", async (req, res, next) => {
  const { title, description, url, releaseDate, company, creator } = req.body;
  try {
    const response = await Games.create({
      title: title,
      description: description,
      url: url,
      releaseDate: releaseDate,
      company: company,
      creator: creator,
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
  const { gameId } = req.params
  console.log("PROBANDO", gameId);

  const { title, decription, url, releaseDate, company } = req.body
  console.log(req.body);

  Games.findByIdAndUpdate(gameId, { title, decription, url, releaseDate, company })

    .then((game) => {
     
      res.redirect("/body/list-games")
    })
    .catch((err) => next(err))

})


//rutas de las publicaciones(los posts)

router.get("/form-post/:gameId", (req, res, next) => {
  res.render("body/form-post.hbs");
});

router.post("/form-post/:gameId", async (req, res, next) => {
  const { games, title, description, author } = req.body;
  try {
    const response = await Post.create({
      games: games,
      title: title,
      description: description,
      author: author,
    });
    res.redirect("/body/post");
  } catch (error) {
    next(error);
  }
});

// router.get("/post", (req, res, next) => {
//   res.render("/body/post.hbs")
// })

module.exports = router;
