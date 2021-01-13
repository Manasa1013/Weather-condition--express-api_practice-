const express = require("express")
const app = express()
const bodyParser = require("body-parser")
const https = require("https")
// const { urlencoded } = require("body-parser")
app.use(express.static("public"))
app.use(bodyParser.urlencoded({extended:true}))
app.get('/',function(req,res){
    console.log("Server started");
    res.sendFile(__dirname+"/index.html")
   
})

app.post("/", function(req,res){
    const city = req.body.cityname
    const unit = "metric"
    const apiKey = "efade5f12b1ec63adf6ffd29adfd4615"
    const url = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + apiKey + "&units=" + unit 
    
    // const some = "https://api.openweathermap.org/data/2.5/weather?q=London&appid=efade5f12b1ec63adf6ffd29adfd4615&units=metric"
    https.get(url,function(response){
        response.on("data",function(data){
            const weatherData = JSON.parse(data)
            const icon = weatherData.weather[0].icon
            const imgUrl = "http://openweathermap.org/img/wn/"+ icon +"@2x.png"
             
            res.write("<h1>Today's temperature in "+city+" is "+weatherData.main.temp+"degree Celsius</h1>\n")
            res.write("<h2>"+city+" latitude and longitude are "+weatherData.coord.lat+" and "+weatherData.coord.lon+"</h2>")
            res.write("<h3>Description is: "+weatherData.weather[0].description+"</h3> <img src="+imgUrl+" alt="+"storms" +">")
            res.send()
        })
    })

})


app.listen(process.env.PORT || 9000,function(){
    console.log("My server started on port 9000");
})