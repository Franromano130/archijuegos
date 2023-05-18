const express = require("express");
const router = express.Router();
const cloudinary = require('cloudinary').v2

const { isLoggedIn, isAdmin } = require("../middlewares/auth.middlewares.js");



// rutas privadas. Solo accesibles para usuarios registrados
router.get("/dashboard", isLoggedIn, (req, res, next) => {
  console.log("quien me hace la llamada", req.session.user);

  res.render("profile/dashboard.hbs", {
    isUserActive: req.session.user !== undefined,
    isUserAdmin: req.session.user.role === "admin"
  });
});

router.get("/admin-dashboard", isLoggedIn, isAdmin, (req, res, next) => {
  res.render("profile/admin-dashboard.hbs", {
    isUserActive: req.session.user !== undefined,
    isUserAdmin: req.session.user.role === "admin"
  })
})



module.exports = router;
