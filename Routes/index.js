var express=require("express");
var router =express.Router();
var User = require("../models/user.js");
var bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');


router.get("/login",(req,res)=>{
    res.render("../views/login.ejs")
})

router.get("/signup",(req,res)=>{
    res.render("../views/signup.ejs")
})


//Handling register
router.post("/signup",(req, res)=>{
    bcrypt.genSalt(10, function(err, salt) {
        bcrypt.hash(req.body.password, salt, function(err, hash) {
            // Store hash in your password DB.
            if(err)
                console.log(err.message);
            else
            {
                var newUser = new User({username: req.body.username,password:hash});
                User.create(newUser,(err, user)=>{
                if(err){
                    console.log(err.message);
                }
                else{
                    res.json(user);
                }
                });
            }
        });
    });
    
});



//Handling login
router.post('/login', function(req, res){
    User.findOne({username: req.body.username})
    .then(function(user) {
       bcrypt.compare(req.body.password, user.password,(err, result)=>{
           console.log(result);
          if(err) {
             return res.status(401).json({
                failed: 'Wrong Email :Unauthorized Access'
             });
          }
          if(result) {
             const JWTToken = jwt.sign({
                email: user.email,
                _id: user._id
             },
             'secret',
                {
                   expiresIn: '2h'
                });
             return res.status(200).json({
                success: 'Welcome '+user.username,
                token: JWTToken
             });
          }
          return res.status(401).json({
             failed: 'Wrong Password '
          });
       });
    })
    .catch(error => {
       res.status(500).json({
          error: error
       });
    });;
 });


module.exports = router;