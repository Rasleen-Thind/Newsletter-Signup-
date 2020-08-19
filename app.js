//jshint esversion: 6

const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const https = require("https");

const app = express();
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));

app.get("/",function(req,res){
  res.sendFile(__dirname + "/signup.html");
});

app.post("/",function(req,res){
  const fname = req.body.firstname;
  const lname = req.body.lastname;
  const email = req.body.email;
  console.log(fname,lname,email);

  const data={
    members: [
      {
        email_address: email,
        status : "subscribed",
        merge_fields: {
        FNAME : fname,
        LNAME : lname
      }
    }
    ]
  };
  const jsonData = JSON.stringify(data);
  const url = "https://us8.api.mailchimp.com/3.0/lists/e45e0f6b61";
  const options = {
    method: "POST",
    auth: "rasna:8bd35e78ac2754df4f2b0c2edcc51f29-us8"
  };

  const request = https.request(url,options,function(response){
    if(response.statusCode === 200)
    {
      res.sendFile(__dirname + "/success.html");
    }
    else{
      res.sendFile(__dirname + "/failure.html");
    }
    response.on("data",function(data){
      console.log(JSON.parse(data));
    });
  });
  request.write(jsonData);
  request.end();
});

app.post("/failure",function(req,res){
  res.redirect("/");
});

app.listen(process.env.PORT || 3000,function(){
  console.log("Server is running on port 3000.");
});

//API Key
//8bd35e78ac2754df4f2b0c2edcc51f29-us8

//listid
//e45e0f6b61
