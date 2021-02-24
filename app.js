/*for internal server express */
const express= require("express");
const bodyParser= require("body-parser");
const https= require("https");
require("dotenv").config();


/*native https method for external API in node */


const app= express();

app.use(bodyParser.urlencoded({extended:true}));

app.get("/", (req, res)=>{
  res.sendFile(__dirname +"/index.html");
   
});

app.post("/" , (req, res)=>{
    const query= req.body.cityName;
    const unit="metric";
    const apikey= process.env.API_KEY;
    const url="https://api.openweathermap.org/data/2.5/weather?q=" + query + "&units="+ unit + "&appid="+ apikey;

    https.get(url, (response)=>{

    response.on("data", (data)=>{
    const weatherData=JSON.parse(data);
    const temp= weatherData.main.temp;
    const desc= weatherData.weather[0].description;
    const icon=weatherData.weather[0].icon;
    const imgurl="http://openweathermap.org/img/wn/" + icon + "@2x.png";

    res.write("<p>The weather at the moment is : " + desc + "</p>");
    res.write("<h1>The temperature in " + query + " is "+  temp + " degrees Celcius</h1>");
    res.write("<img src=" +imgurl +">" );
    res.send();
    });

  
});
    
});


app.listen(3000, ()=>{
    console.log("server started at port 3000");
});


