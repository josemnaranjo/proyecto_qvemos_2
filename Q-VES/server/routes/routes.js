const UserController = require("../controllers/user.controller");
const authenticate = require("../config/authenticate");

module.exports = app =>{

    //USUARIO
    app.post("/api/register",UserController.Register);
    app.post("/api/login",UserController.Login);
    app.post("/api/logout",UserController.Logout);
    app.get("/api/users",authenticate,UserController.getAll);
    app.get("/api/user/:id",authenticate,UserController.getUser);

    //QVES



}