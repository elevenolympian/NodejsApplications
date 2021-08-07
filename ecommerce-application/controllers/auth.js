const jwtAuthentication = require('jsonwebtoken'); //to generate signed token
const expressJwt = require('express-jwt'); //for authorization check
const User = require('../models/user');
const {errorHandler} = require('../helpers/dbErrorHandler');
const dotenv = require('dotenv');
dotenv.config();
console.log("process.env.JWT_SECRET" + process.env.JWT_SECRET);

exports.test = (req, res) => {
  console.log("test router is here");
  return res.json({message: "hello test app"});
}

exports.signup = (req, res) => {
    // res.json({ message: "hello application. this is from the controller" }); //message is coming from the controller
    console.log("req.body", req.body);
    const user = new User(req.body);
    user.save((err, user) => {
      if(err) {
        return res.status(400).json({err: errorHandler(err)});
      }

      //we need to hide salt and hashpassword to the external eyes
      // user.salt = undefined
      // user.hashed_password = undefined;

      res.json({
        user
      });
    })
};

exports.signin = (req, res) => {
    try {
      const {email, password} = req.body;
      User.findOne({email}, (err, user) => {
          if(err || !user){
            return res.status(400).json({
              err: 'User not found. Please, signup'
            });
          }

          // if user is found, ensure the email and password match
          // create authenticate method in user model
          if(!user.authenticate(password)) {
              return res.status(401).json({
                  error: 'Email and password do not match'
              });
          }//if we cannot authenticate the user

          // generate a signed token with user id and secret
          const token = jwtAuthentication.sign({_id: user._id}, process.env.JWT_SECRET);
          //preserve the token as 't' in cookie with expiry date
          res.cookie("t", token, {expire: new Date() + 9999})

          //return a response with a user and token to frontend client
          const {_id, name, email, role } = user
          return res.json({token, user:{_id, email, name, role}});

      });
    }catch(ex) {
      console.log(ex);
    }
};

exports.signout = (req, res) => {
    res.clearCookie("t")
    res.json({message: "Signout successful"});
};

exports.requireSignin = expressJwt({
  secret: process.env.JWT_SECRET,
  algorithms: ["HS256"], // added later - it is important
  userProperty: "auth",
});


exports.isAuth = (req, res, next) => {
      let user = req.profile && req.auth && req.profile._id == req.auth._id
      if(!user) {
          return res.status(403).json({error: "access denied"}); //403 is the HTTP code for Forbidden request
      }
      next();

}

exports.isAdmin = (req, res, next) => { //only admin can authenticate with this router
    if(req.profile.role == 0) { //admin is 1
        return res.status(403).json({
            error: "Admin resource: Access denied"
        })
    }
    next();
};

// console.log("process.env.JWT_SECRET" + process.env.JWT_SECRET);
// console.log("process.env.JWT_SECRET" + process.env.PORT);
// console.log("process.env.JWT_SECRET" + process.env.DATABASE);
