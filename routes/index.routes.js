const express = require('express');
const router = express.Router();
const cloudinary = require('cloudinary').v2

const { updateLocals} = require("../middlewares/auth.middlewares.js")

router.use(updateLocals)


/* GET home page */
router.get("/", (req, res, next) => {
  res.render("index");
});

const authRoutes = require("./auth.routes.js")
router.use("/auth", authRoutes)

const profileRouter = require("./profile.routes.js")
router.use("/profile", profileRouter)

const gameRouter = require("./game.routes.js")
router.use("/body", gameRouter)

const postRouter = require("./post.routes.js")
router.use("/post", postRouter)

module.exports = router;
