//jshint esversion:6

const express= require("express");
const https=require("https");
const bodyParser=require("body-parser");

const app=express();
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));
app.set("view engine", "ejs");


app.get("/", function(req, res){
  res.render("home");

});

app.post("/",function(req,res){
  const city= req.body.cityName;
  const apiKey="f49a30fd89664db346cb47650eb42c09";
  const units="metrics";
    const url="https://api.openweathermap.org/data/2.5/weather?q="+city+"&units="+units+"&appid="+apiKey;
    https.get(url,function(response){
    response.on("data",function(data){
        const weatherData=JSON.parse(data);
        const temperature= Math.round((weatherData.main.temp)-273);
        const desc=weatherData.weather[0].description;
        const icon=weatherData.weather[0].icon;
        const imgURL="http://openweathermap.org/img/wn/" + icon + "@2x.png";
        res.render("result", {city:city, temperature:temperature, desc:desc , icon:icon , imgURL:imgURL});
        //first variable refers to variable name in ejs
        //second is the variable name it refers to in app.js

      });
  });

});
app.listen(4000,function(){
  console.log("server started on port 4000");
});
