const router = require("express").Router();
const signUpService = require("../services/signup.service");

router.post("/create", signUpService.signUp);

router.post("/login", signUpService.login);

module.exports = router;
