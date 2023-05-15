const express = require("express");
const router = express.Router();

const { isLoggedIn, isAdmin } = require("../middlewares/auth.middlewares.js");



// rutas privadas. Solo accesibles para usuarios registrados
router.get("/", isLoggedIn, (req, res, next) => {
  console.log("quien me hace la llamada", req.session.user);

  res.render("profile/dashboard.hbs");
});

router.get("/admin", isLoggedIn, isAdmin, (req, res, next) => {
  res.render("profile/admin-dashboard.hbs")
})

module.exports = router;
