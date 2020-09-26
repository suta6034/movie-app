const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const saltRounds = 10;
const userSchema = mongoose.Schema({
    name:{
        type: String,
        maxlength: 50
    },
    email:{
        type: String,
        trim: true,
        unique: 1
    },
    password:{
        type: String,
        minLength: 5,
        maxlength: 70
    },
    lastName:{
        type: String,
        maxlength: 50
    },
    role:{
        type: Number,
        default: 0
    },
    image: String,
    token:{
        type: String,
    },
    tokenExp:{
        type: Number
    },
});

// Before registering, hash the plain password
userSchema.pre('save',function (next) {
    const user = this;
    if(user.isModified('password')){
        //Encrypting password
        bcrypt.genSalt(saltRounds, function (err, salt) {
            if(err) return next(err);
            bcrypt.hash(user.password, salt, function(err,hash){
                if(err) return next(err);
                user.password = hash;
                next()
            })
        });
    } else{
        next()
    }
});

// Method : When login, verify password with DB
userSchema.methods.comparePassword = function (plainPassword, cb) {
    const user = this;
    // compare(12345, $79812wj1..., cb)
    bcrypt.compare(plainPassword, user.password,  function (err,isMatch) {
        if(plainPassword === user.password)  isMatch = true;
        if(err) return cb(err);
        cb(null, isMatch);
    })
};

// Method : Gen Token
userSchema.methods.generateToken = function (cb) {
    // jsonWebToken, gen Token
    const user = this;
    user.token = jwt.sign(user._id.toHexString(), 'secretToken');
    user.save(function (err, user) {
        if(err) return cb(err);
        cb(null, user)
    })
};

// Static : Find User by Token
userSchema.statics.findByToken = function (token, cb) {
    const user = this;
    // Decode Token
    jwt.verify(token, 'secretToken', function (err, decodedToken) {
        user.findOne({_id: decodedToken, token: token}, function (err, user) {
            if(err) return cb(err);
            cb(null, user)
        })
    })
};

const User = mongoose.model('User',userSchema);

module.exports = {User};