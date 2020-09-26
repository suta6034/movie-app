const {auth} = require("./backend/middleWare/auth");
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const config = require('./backend/config/key');
const {User} = require('./backend/models/User');
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use(cookieParser());

const mongoose = require('mongoose');
mongoose.connect(config.mongoURI, {
    useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: false
}).then (r => console.log('MongoDB Connected...'))
    .catch( err => console.log(err));

app.post('/api/users/register',(req,res) => {
    const user = new User(req.body);
    user.save((err, doc) => {
        if(err) return res.json({success: false, err});
        return res.status(200).json({success: true})
    })
});

app.post('/api/users/login', (req,res) => {
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

app.get('/api/users/logout', auth , (req,res) =>{
    User.findOneAndUpdate({_id: req.user._id}, {token: ""},(err, user) =>{
        if(err) return res.json({success: true, err});
        return res.status(200).send({
            success: true
        })
    })
});

app.get('/api/users/auth', auth , (req,res) =>{
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

const port = 5000;
app.listen(port, () => console.log(`Listening on port ${port}!`));