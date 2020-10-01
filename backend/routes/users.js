const express = require('express');
const router = express.Router();
const {User} = require('../models/User');
const {auth} = require('../middleWare/auth');

// ===============================
//              USER
// ===============================


router.post('/register',(req,res) => {
    const user = new User(req.body);
    user.save((err, doc) => {
        if(err) return res.json({success: false, err});
        return res.status(200).json({success: true})
    })
});

router.post('/login', (req,res) => {
    // Find the corresponding Email in DB by Login Info
    User.findOne({email: req.body.email}, (err, user) => {
        if (!user) {
            return res.json({loginSuccess: false, message: "User does not exist"})
        }
        // If the Email exists, check password(by MongoDB method)
        user.comparePassword(req.body.password, (err, isMatch) => {
            if (!isMatch) return res.json({loginSuccess: false, message: "wrong password"});
            // if all correct, gen Token
            user.generateToken((err, user)=>{
                if(err) return res.status(400).send(err);
                // save Token in Cookie
                res.cookie('x_auth',user.token)
                    .status(200).json({loginSuccess: true, userId: user._id})
            })
        })
    })
});

router.get('/logout', auth , (req,res) =>{
    User.findOneAndUpdate({_id: req.user._id}, {token: ""},(err, user) =>{
        if(err) return res.json({success: true, err});
        return res.status(200).send({
            success: true
        })
    })
});

router.get('/auth', auth , (req,res) =>{
    res.status(200).json({
        _id: req.user._id,
        isAdmin: req.user.role !== 0,
        isAuth: true,
        email: req.user.email,
        name: req.user.name,
        lastName: req.user.lastName,
        role : req.user.role,
        image: req.user.image
    })
});

module.exports = router;