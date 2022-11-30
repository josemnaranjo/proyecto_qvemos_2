const UserController = require("../controllers/user.controller");
const RecommendationController = require('../controllers/recommendation.controller');
const authenticate = require("../config/authenticate");

module.exports = app =>{

    //USUARIO
    app.post("/api/register",UserController.Register);
    app.post("/api/login",UserController.Login);
    app.post("/api/logout",UserController.Logout);
    app.get("/api/users",authenticate,UserController.getAll);
    app.get("/api/user/:id",authenticate,UserController.getUser);

    //QVEN
    app.post('/api/new-recommendation/:id',authenticate,RecommendationController.addRecommendation);
    app.get('/api/new-finalists-collection',authenticate,RecommendationController.createFinalistsCollection);
    app.get('/api/finals/:id',authenticate,RecommendationController.getThreeFinalists);
    app.get('/api/finalists-collection/:id',authenticate,RecommendationController.getFinalists);
    app.post('/api/add-vote/:id',authenticate,RecommendationController.addVoteToRecommendation);
    app.get('/api/get-winner',authenticate,RecommendationController.getWinner);
    app.post('/api/score-winner/:id',authenticate,RecommendationController.addScore);
}