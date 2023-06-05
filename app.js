//jshint esversion:6
//npm in the above commands stands for node package manager, a place from where we install all the dependencies.
const express = require("express");    //node framework //use Express.js in order to create a server
const bodyParser = require("body-parser");//middleware for sending data from user to server by using post method
const ejs = require("ejs");//generate HTML markup with plain JavaScript.
const _ =require("lodash");//more concise and maintainable JavaScript

const homeStartingContent = "While blogging among adults as a whole has remained steady, the prevalence of blogging within specific age groups has changed dramatically in recent years. Specifically, a sharp decline in blogging by young adults has been tempered by a corresponding increase in blogging among older adults.Being a teenager is difficult no matter what, and the coronavirus disease (COVID-19) is making it even harder. With school closures and cancelled events, many teens are missing out on some of the biggest moments of their young lives — as well as everyday moments like chatting with friends and participating in class. For teenagers facing life changes due to the outbreak who are feeling anxious, isolated and disappointed, know this: you are not alone";
const aboutContent = "Hac habitasse platea dictumst vestibulum rhoncus est pellentesque. Dictumst vestibulum rhoncus est pellentesque elit ullamcorper. Non diam phasellus vestibulum lorem sed. Platea dictumst quisque sagittis purus sit. Egestas sed sed risus pretium quam vulputate dignissim suspendisse. Mauris in aliquam sem fringilla. Semper risus in hendrerit gravida rutrum quisque non tellus orci. Amet massa vitae tortor condimentum lacinia quis vel eros. Enim ut tellus elementum sagittis vitae. Mauris ultrices eros in cursus turpis massa tincidunt dui.";
const contactContent = "Scelerisque eleifend donec pretium vulputate sapien. Rhoncus urna neque viverra justo nec ultrices. Arcu dui vivamus arcu felis bibendum. Consectetur adipiscing elit duis tristique. Risus viverra adipiscing at in tellus integer feugiat. Sapien nec sagittis aliquam malesuada bibendum arcu vitae. Consequat interdum varius sit amet mattis. Iaculis nunc sed augue lacus. Interdum posuere lorem ipsum dolor sit amet consectetur adipiscing elit. Pulvinar elementum integer enim neque. Ultrices gravida dictum fusce ut placerat orci nulla. Mauris in aliquam sem fringilla ut morbi tincidunt. Tortor posuere ac ut consequat semper viverra nam libero.";

 let posts=[]; //variable array

const app = express();


app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));//another method to access data of the form

app.use(express.static("public"));        //applying css in website //static hosting ie. applying/displaying all the static files in public folder directly to webserver port

app.get("/",function(req,res){     //on sending a get(/) request to server //creating a endpoint/api
    res.render("home",{             //sending home page path in response 
    Startingcontent:homeStartingContent,
    posts:posts
   });
  // res.redirect("/compose");  
});

app.get("/about",function(req,res){                       //creating a endpoint/api 
   res.render("about",{aboutContent:aboutContent});
});

app.get("/contact",function(req,res){
  res.render("contact",{contactContent:contactContent});
});

app.get("/compose",function(req,res){
   res.render("compose");
});

// the POST request method requests that a web server accept the data enclosed in the body of the request message
//Route parameters are named URL segments that are used to capture the values specified at their position in the URL. The captured values are populated in the req.params object, with the name of the route parameter specified in the path as their respective keys.
app.get("/posts/:postName",function(req,res){     //2nd way to send data from user to server---param method
  
  const requestedTitle=_.lowerCase(req.params.postName);
  console.log(requestedTitle);
  //forEach is just like for loop in javascript
  posts.forEach(function(post){ 
    const storedTitle=_.lowerCase(post.title);
    if(storedTitle===requestedTitle){
      console.log("Match Found");
      res.render("post",{
        title:post.title,
        content:post.content
      });
    }
  });
});

//body parser(3rd way to send data in the form to server in post request)
app.post("/compose",function(req,res){          //POST is a request method supported by HTTP used by the World Wide Web. The HTTP POST method sends data to the server.
  const post={                                  //it is a request which gives answer to data send through form data
    title: req.body.postTitle,
    content: req.body.postBody
  };
  posts.push(post);                  //pushing all the elements of post to posts array
  res.redirect("/");                //get redirected to home page from compose page
});


//listening to port no. 3000
app.listen(process.env.PORT ||3000, function() {
  console.log("Express Server started on port 3000");
});
//type rs in hyper terminal to reset the server as nodemon doesnot erase the previous stored value