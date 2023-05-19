# archijuegos

## [See the App!](https://archijuegos.adaptable.app/)

![App Logo](https://github.com/Franromano130/archijuegos/assets/128600279/f9d84277-6d9b-4dab-9fb0-065723295a9e)


## Description

**NOTE -** Describe your project in one/two lines.
Este proyecto es un blog de videojuegos donde los usuarios puedan opinar de un videojuego, para asi demostrar cuando lo aprecian ( o lo odian), es una página sencilla de la cual no es dificil acostumbrarse y fácil de interpretar 
 
## User Stories

**NOTE -**  List here all the actions a user can do in the app. Example:

- **404** - Si ocurre este error significa que como usuario (tú) intentaste alcanzar una pagina que no existe, por lo que deberias buscar en otro lado o directamente no ir a esa URL. 
- **500** - Si este erro ocurre significa que los desarrolladores (nosotros) cometimos un error con la página que quieres visitar y no estaria disponible en esos momentos.
- **homepage** - Nuestro blog tiene una pagina OBLIGATORIA de registro y logeo por lo que la primera vista que usted tendrá será la vista de iniciar sesion
- **sign up** - Como dice en la linea anterior usted tiene que registrarse obligatoriamente para poder ver todo el contenido de la web  y disfrutar de sus funciones  
- **login** - El login para acceder a la web con todas sus funcionalidades 
- **logout** - como usuario usted puede cerrar la sesion en cualquier momento dentro de la pestaña "perfil"
- **list-games** - El usuario puede ver toda la lista de los videojuegos que están disponibles en la web de momento
- **form-post** - Como usuario puedes crear una publicacion de el juego que elijas de la lista y opinar sobre él
- **create-data** - En este apartado SOLO los admins puede crear data para agregar un juego a la lista 
- **post-list** - El usuario tiene acceso a la lista de todas las publicaciones hechas por otros usuarios para echarles un ojo y ver que tal

## Backlog Functionalities

**NOTE -** List here all functionalities you wish to add to your proyect later.

## Technologies used

- **javascript** -
- **express** -
- **Bootstrap** -
- **Handlebars** -
- **cloudinary** -


## (Optional) Routes

**NOTE -** List here all the routes of your server. Example:

- GET / router.get("/", (req, res, next) )
  - renders the homepage
- GET / router.get("/signup", (req, res, next) ) 
  - renderiza "auth/signup.hbs" para ir al formulario de registro
- POST / router.post("/signup", (req, res, next)
  - esta ruta es para recibir la info del usuario y crearla en la base de datos
  - body:
    - username
    - email
    - password
- GET router.get("/login", (req, res, next) ) 
  - Renderiza al formulario de acceso a la pagina
- POST router.post("/login", (req, res, next) ) 
  - recibe las credenciales del usuario para validarlas y dar acceso
  - body:
    - username
    - password

- GET router.get("/inicio", isLoggedIn, (req, res, next) => {
  -  renderiza la pagina de inicio del blog
- GET /router.get("/create-data", isLoggedIn, isAdmin, (req, res, next) => {
  - renderiza la vista de create-data.hbs donde se crean los videojuegos

- POST router.post("/create-data", isLoggedIn, isAdmin, uploader.single("url"), async (req, res, next) => {
   - aqui usamos las propiedades del modelo "Game"
      - title
      - description
      - url
      - releaseDate
      - company
      - creator
- GET router.get("/list-games", isLoggedIn, (req, res, next) => {
    -renderizamos la lista de videojuegos
- GET router.get("/list-games/:gameId", isLoggedIn, async (req, res, next) => {   
     -listamos los videojuegos por su ID 
- GET router.get("/edit-games/:gameId", isLoggedIn, (req, res, next) => {   
     -   Buscamos los videojuegos por su ID asi cada pagina de cada juego sea única 
- POST router.post("/edit-games/:gameId", isLoggedIn, (req, res, next) => {
     - apartado que nos permite editar los videojuegos usando la base de la creación
- POST router.post("/edit-games/:gameId/delete", isLoggedIn, isAdmin, (req, res, next) => {
     - Nos permite eliminar directamente un videojuego con todos sus datos
- GET router.get("/form-post/:gameId", (req, res, next) => {
      - Formulario para crear la publicación de los videojuegos
- POST router.post("/form-post/:gameId", async (req, res, next) => {
      - aqui usamos las propiedades del modelo "Post"
            - title
            - description
            - url
            - _Id
            - gameId
- GET router.get("/post-list", (req, res, next) => {
      - buscamos una propiedad el post para asi que aparezca en la lista y usarlo como url para acceder a los demás datos
- GET router.get("/post/:postId", async(req, res, next) => {
      - Aqui ponemos los detalles de los post en la publicacion en si
- GET router.get("/edit-posts/:postId", (req, res, next) => {
      -
- POST router.post("/edit-posts/:postId", (req, res, next) => {
      - Aqui habilitamos la opcion de editar el post
- POST router.post("/edit-posts/:postId/delete", (req, res, next) => {
     - Aqui permitimos eliminar el post




## Models

**NOTE -** List here all the models & Schemas of your Database Structure. Example: 

Games model
 
```
 title: String,
  description: String,
  url: String,
  releaseDate: Date,
  company: String,
  creator: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  posts: [{
    type: Schema.Types.ObjectId,
    ref: "Post",
```

Post model

```
  games: {
    type: Schema.Types.ObjectId,
    ref: "Games",
  },
  title: String,
  description: String,
  url: String,
  author: {
    type: Schema.Types.ObjectId,
    ref: "User",
``` 

User model


```
    username: {
      type: String,
      trim: true, 
      required: false,
      unique: false
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true
    },
    password: {
      type: String,
      required: true
    },
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user"
    }


``` 


## Links

## Collaborators

[Developer 1 name](https://github.com/alvaritohegon)

[Developer 2 name](https://github.com/Franromano130)

### Project

[Repository Link](https://github.com/Franromano130/archijuegos)

[Deploy Link](www.your-deploy-url-here.com)
