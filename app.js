const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require('mongoose');

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

app.get("/",function(req,res){

    const posts = new wikiPost ({
        title: "Kohat",
        content: "theadfkasdklfj;"

    });
    posts.save();
    console.log("saved");
})



app.listen(3000, function() {
    console.log("Server started on port 3000");
  });
  