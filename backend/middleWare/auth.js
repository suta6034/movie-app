const {User} = require('../models/User');

let auth = (req, res, next) => {
    // Get Token from cookie
    let token = req.cookies.x_auth;

    // Decode Token and find user with it
    User.findByToken(token, (err, user) =>{
        if(err) throw err;
        if(!user) return res.json({isAuth: false, error: true});
        req.token = token;
        req.user = user;
        next()
    })
};

module.exports = { auth };