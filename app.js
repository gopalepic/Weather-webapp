const { log } = require('console');
const {response} = require('express');
const express = require('express');
const bodyParser = require('body-parser');
const https = require("https");
const { dirname } = require('path');

const app = express();
app.use(bodyParser.urlencoded({extended:true}));


app.get('/',(req,res) => {
  
  res.sendFile(__dirname + "/index.html");

 });

 app.post("/",(req,res) => {
     
  const weatherCity = req.body.CityName;
  const apiKey = '6ea01e03087df12221b833cda5e13b5b'
  const url = 'https://api.openweathermap.org/data/2.5/weather?q='+ weatherCity +'&appid=' + apiKey + '&units=metric'
  https.get(url , (response) => {
  // console.log(response.statusCode)

  response.on('data',(data) =>{
     // console.log(data);
   const weatherData = JSON.parse(data);
     //console.log(weatherData)
   const Temp = weatherData.main.temp;
   const description = weatherData.weather[0].description;
   //console.log(description);
   res.write(" <h1>The temperature in "+weatherCity+ " " + Temp + " degree celcuis</h>")

   res.write(
      "<p>the weather description is " + description +" </p>"
   )
   
  })

  })
  
 })


app.listen(3000,()=> console.log(" server engaged"));