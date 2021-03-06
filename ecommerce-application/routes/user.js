const express = require('express')
const router = express.Router()

//controller
const {userById} = require("../controllers/user");
const {requireSignin, isAuth, isAdmin} = require("../controllers/auth");

//test Routes
router.get('/secret/:userId', requireSignin, isAuth, isAdmin, (req, res) => {
    res.json({
      user: req.profile
    });
});


router.param('userId', userById);



module.exports = router;
