const express = require('express')
const router = express.Router()

//controller
const {signup, test, signin, signout} = require("../controllers/auth");
const {requireSignin} = require("../controllers/auth");
const {userSignupValidator} = require("../validator/index.js");
const {signinRoute} = require("../controllers/auth");
router.get("/test", test);
router.post("/signup", userSignupValidator, signup); //we will add the validator process into here
router.post("/signin", signin); // there is an error here
router.get("/signout", signout);
router.get("/hellorouter", requireSignin, (req, res)=> {
    res.send("hello application");
});

module.exports = router;
