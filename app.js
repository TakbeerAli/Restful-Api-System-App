const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require('mongoose');
const e = require("express");

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));
mongoose.connect("mongodb://localhost:27017/wikiDB", {useNewUrlParser: true, useUnifiedTopology: true});

const wikiSchema = {
title:String,
content:String
};

const wikiPost = mongoose.model("article",wikiSchema);

app.get("/articles",function(req,res){  // this route is for API sending data to client

  wikiPost.find(function(err, founditem){

    if(!err){
        res.send(founditem);
    }
    else{
        res.send(err);
    }
  });
});

app.post("/articles", function(req,res){

    const Title = req.body.title;
    const Content = req.body.content;


    const articl = new wikiPost({
    title:Title,
    content:Content

    });
    articl.save(function(err){
        if(!err){
            res.send("SuccesFully Saved")
        }
        else{
            res.send(err);
        }
    })
    
});

app.delete("/articles", function(req,res){  // Delete route to delet all records form DB
wikiPost.deleteMany(function(err){
if(!err){
    console.log("Sucess Deleted")
}
else{
    console.log(err)
}
});

});



app.listen(3000, function() {
    console.log("Server started on port 3000");
  });
  