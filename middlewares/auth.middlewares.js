function isLoggedIn(req, res, next) {
  
    if (req.session.user === undefined) {
        res.redirect("/")
    } else {
        next() // continua con la ruta
    }

}

function updateLocals(req, res, next) {
    if (req.session.user === undefined) {
      res.locals.isUserActive = false;
    } else {
      res.locals.isUserActive = true;
    }
    // al tener diferentes roles (user y admin), y enlaces de roles, el condiconal arriba debe incluir variables locales para mostar/ocultar esos enlaces
    next();
}

function isAdmin(req, res, next) {
    console.log(req.session.user)
    if (req.session.user.role === "admin") {
        next()
    } else {
        res.redirect("/body/inicio")     
    }
}

module.exports = {
    isLoggedIn: isLoggedIn,
    updateLocals: updateLocals,
    isAdmin: isAdmin
}