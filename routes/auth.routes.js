const express = require("express");
const router = express.Router();

// aqui iran nuestras rutas de auntenticacion
// GET "/auth/signup" => esta ruta renderiza el formulario de registro
router.get("/signup", (req, res, next) => {
  res.render("auth/signup.hbs");
});
// POST "/auth/signup" => esta ruta recibir las credenciales del usuario y crearla en la base de datos
router.post("/signup", (req, res, next) => {
  console.log(req.body);
  const { username, email, password } = req.body;
  if (email === "" || password === "") {
    console.log("el email y la contra estan vacios");
    res.render("auth/signup.hbs", {
      errorMessage: "los campos de email y contraseña son obligatorios",
    });
    return;
  }
  res.redirect("/"); //este redirect nos llevara a la pagina de inicio
});

// GET "/auth/login" => renderiza el formulario de acceso a la pag
router.get("/login", (req, res, next) => {
  res.render("auth/login.hbs");
});

//POST "/auth/login" => recibir las credenciales del usuario y validar su identidad
router.get("/auth/login", (req, res, next) => {});

module.exports = router;
