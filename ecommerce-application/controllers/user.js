const User = require('../models/user')

exports.userById = (req, res, next, id) => {
    User.findById(id).exec((err, user) => {
        if(err || !user) {
            return res.status(400).json({error: 'User not found'});
        }
        //add the user object into the request object
        req.profile = user;
        next(); //application does not get stuck
    });
};
