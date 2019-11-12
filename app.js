const express = require("express");
const app = express();
const bodyParser=require("body-parser");
const mongoose	=require("mongoose");

let User=require("./models/user.js");
let controller=require("./Routes/index.js")

//APP config
mongoose.connect("mongodb://localhost/loginAPI",{useUnifiedTopology: true , useNewUrlParser: true});
app.use(bodyParser.urlencoded({extended:true}));
app.set("view engine","ejs");
app.use(express.static(__dirname + '/public'));


app.use(controller);


//listening to correct port
var listener = app.listen(5000, function(){
    console.log('Listening on port ' + listener.address().port); //Listening on port 8888

});