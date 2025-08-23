const express =require("express");
const route = express.Router();

const userControllers = require("../controllers/userControllers");
route.post("/registration",userControllers.userRegistration);
route.post("/login",userControllers.userLogin);


module.exports = route;