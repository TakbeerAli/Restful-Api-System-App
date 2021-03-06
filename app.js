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

///////specific route for all Adress & request targeting all articles /////////

app.route("/articles")

.get(function(req,res){  // this route is for API sending data to client

    wikiPost.find(function(err, founditem){
  
      if(!err){
          res.send(founditem);
      }
      else{
          res.send(err);
      }
    });
  })

.post(function(req,res){

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
    
})

.delete(function(req,res){  // Delete route to delet all records form DB
    wikiPost.deleteMany(function(err){
    if(!err){
        console.log("Sucess Deleted")
    }
    else{
        console.log(err)
    }
    });
    
    });


///// Request Targeting specific Article/////////////////

app.route("/articles/:articleTitle")
.get(function(req, res){  // Get specfic Data from DB 

    wikiPost.findOne({title:req.params.articleTitle}, function(err, foundArticle){
     if(foundArticle)
     {
         res.send(foundArticle)
     }else{
         res.send("No Article found according to you matching you provide");
     }
    })
})

.put(function(req, res){ // update hole records in DB without specific field

    wikiPost.update(
        {title:req.params.articleTitle},
        {title:req.body.title, content: req.body.content},
        {overwrite:true},
        function(err){
            if(!err){
                res.send("Record Updated Succesfully");
            }

        }
    );
})

.patch(function(req, res){ // Update only those records which needed to change only by PATCH
    wikiPost.update(
        {title:req.params.articleTitle},
        {$set:req.body},
        function(err){
            if(!err){
                res.send("succesfully updated")
            }else{
                res.send(err)
            }
        }
    );
})
.delete(function(req, res){  // delet specific record from DB through ResfApi

    wikiPost.deleteOne({title:req.params.articleTitle}, function(err){
        if(!err){
            res.send("Record Deleted Succesfully")
        }else{
            res.send(err)
        }
    })

});



app.listen(3000, function() {
    console.log("Server started on port 3000");
  });
  