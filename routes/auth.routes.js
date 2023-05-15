const express = require("express");
const router = express.Router();

// aqui iran nuestras rutas de auntenticacion
const User = require("../models/User.model.js");
const bcrypt = require("bcryptjs");

// GET "/auth/signup" => esta ruta renderiza el formulario de registro
router.get("/signup", (req, res, next) => {
  res.render("auth/signup.hbs");
});

// POST "/auth/signup" => esta ruta recibir la info del usuario y crearla en la base de datos
router.post("/signup", async (req, res, next) => {
  console.log(req.body);
  const { username, email, password } = req.body;
  if (email === "" || password === "") {
    console.log("el email y la contra estan vacios");
    res.render("auth/signup.hbs", {
      errorMessage: "los campos de email y contraseña son obligatorios",
    });
    return;
  }

  // validacion de contraseña
  const regexPattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/gm;
  if (regexPattern.test(req.body.password) === false) {
    res.render("auth/signup.hbs", {
      errorMessage:
        "La contraseña no es suficientemente fuerte. Necesita al menos, una mayúscula, una minúscula, un caracter especial y mínimo 8 caracteres",
    });
    return;
  }

  try {
    // que no existan usuarios con el mismo correo electronico
    const foundUser = await User.findOne({ email: email });
    // si consigue el usuario
    if (foundUser !== null) {
      res.render("auth/signup.hbs", {
        errorMessage: "Ya existe un usuario con ese correo electrónico",
      });
      return;
    } // todo probar la ruta cuando tengamos usuarios en la DB

    // encriptacion de contraseña
    const salt = await bcrypt.genSalt(12);
    const hashPassword = await bcrypt.hash(password, salt);
    console.log(hashPassword);

    //! AHORA vamos a crear el usuario en la BD
    const response = await User.create({
      username: username,
      email: email,
      password: hashPassword,
    });

    res.redirect("/auth/login");
  } catch (error) {
    next(error);
  }
});

// GET "/auth/login" => renderiza el formulario de acceso a la pag
router.get("/login", (req, res, next) => {
  res.render("auth/login.hbs");
});

//POST "/auth/login" => recibir las credenciales del usuario y validar su identidad
router.post("/login", async (req, res, next) => {
  console.log(req.body);
  const { username, email, password } = req.body;

  // validacion que todos los campos estén llenos.
  if (email === "" || password === "") {
    res.render("auth/login.hbs", {
      errorMessage: "Los campos de email y contraseña son obligatorios",
    });
    return;
  }

  try {
    // validar que el usuario existe en la BD
    const foundUser = await User.findOne({username: username})
    if (foundUser === null) {
      res.render("auth/login.hbs", {
        errorMessage: "Usuario no registrado",
      })
      return
    }

    // validar que la contraseña sea correcta
    const isPasswordCorrect = await bcrypt.compare(password, foundUser.password)
    console.log(isPasswordCorrect);
    if (isPasswordCorrect === false) {
      res.render("auth/login.hbs", {
        errorMessage: "Contraseña no válida",
      })
      return
    }

    // a partir de este ounto ya hemos autenticado al usuario
    // 1. crear una sesion activa del usuario
    // 2. constantemente verificar en ls ruta privadas que el usuario tenga dicha sesion activa
    // todo crea la sesión

    req.session.user = foundUser; // creamos la sesion
    // a partir d este momento tendremos acceso a req.session.user para saber quien es el usuario que me está haciendo llamadas.
    

    req.session.save(()=> {
      res.redirect("/profile");
    })


  } catch (error) {
    next(error);
  }
});

// GET "/auth/logout" => Cerrar (Destruir) la sesión activa
router.get("/logout", (req, res, next) => {

  // esta linea borra la sesión activa del usuario
  req.session.destroy(() => {

    // que ocurre luego de borrar la sesión
    res.redirect("/")

  })

})

module.exports = router;
