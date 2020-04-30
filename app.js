var express = require('express');

var pug = require('pug');

var path = require('path');

const axios = require('axios').default;

var app = express();

var PORT = 3000;

app.set('view engine', 'pug');


const {MongoClient} = require('mongodb');
const uri = "mongodb+srv://Han:cs411@cluster0-x1b1s.mongodb.net/test?retryWrites=true&w=majority";
app.get('/interactWithDb', function(req, res){
    MongoClient.connect(uri, function(err, db) {
      if (err) throw err;
      var dbo = db.db("Events");
      var query = { id:req.query.id};
      dbo.collection("User").find(query).toArray(function(err, result) {
        if (err) throw err;
        console.log(result);
        db.close();
        res.status(200).send(JSON.stringify(result));
})})});

app.get('/address', function(req, res){
    MongoClient.connect(uri, function(err, db) {
      if (err) throw err;
      var dbo = db.db("Events");
      var query = { id:req.query.userId};
      dbo.collection("User").find(query).toArray(function(err, result) {
        if (err) throw err;
        console.log("\n===========v= Action =v==============");
        console.log("  pulling data from the database...\n");
        db.close();
        res.render("template", { title: req.query.userId, message: JSON.stringify(result) })
})})});


app.get('/weather', function(req, res) {
  axios({
    method: 'get',
    url: 'http://api.openweathermap.org/data/2.5/weather',
    params:{
      APPID:"99419ce789d1f71cd2286f1373299291",
      q:req.query.city
    }
  })
    .then(function (response) {
      var city = req.query.city;
      res.writeHead(200, { "Content-type": "text/plain" });
      res.write('The weather in '.concat(city).concat(' is ').concat(JSON.stringify(response.data.weather[0].main)));
      res.write('\n------Description-------\n');
      res.end('    '.concat(JSON.stringify(response.data.weather[0].description)));
      console.log("\n===========v= Action =v==============");
      console.log("   getting weather in: ",city);
    }).
    catch(function(error){
      console.log("\n=======v= Weather Error =v==========");
      console.log(error,"\n");
    });
});

app.get('/lyftPrice', function(req, res) {
  //It's so fuking difficult to get a Lyft api key.
});

app.get('/geocoding', function(req, res) {
  res.writeHead(200, { "Content-type": "text/plain" });
  var address = req.query.location.replace(/ /gi, "+").concat(",+").concat(req.query.city_name);
  console.log(address);
  console.log(req.query.location);
  axios({
    method: 'get',
    url: 'https://maps.googleapis.com/maps/api/geocode/json',
    params:{
      key:"AIzaSyAXRjcG9kMt5TuJ4007ZkNdPbD2axzaEJs",
      address:address
    }
  })
    .then(function (response) {
      res.write('\n\n-----Cordinate at-------\n');
      res.write(address);
      res.write('\n----------Lat-----------\n');
      res.write(JSON.stringify(response.data.results[0].geometry.location.lat));
      res.write('\n----------Lng-----------\n');
      res.end(JSON.stringify(response.data.results[0].geometry.location.lng));
      console.log("\n===========v= Action =v==============");
      console.log("geocoding: ",address);
    }).
    catch(function(error){
      console.log("\n======v= Geocoding Error =v=========");
      console.log(error,"\n");
    });
    axios({
      method: 'get',
      url: 'http://api.openweathermap.org/data/2.5/weather',
      params:{
        APPID:"99419ce789d1f71cd2286f1373299291",
        q:req.query.city_name
      }
    })
      .then(function (response2) {
        var city = req.query.city_name;
        res.write('The weather in '.concat(city).concat(' is ').concat(JSON.stringify(response2.data.weather[0].main)));
        res.write('\n\n------Description-------\n');
        res.write('    '.concat(JSON.stringify(response2.data.weather[0].description)));
        console.log("\n===========v= Action =v==============");
        console.log("   getting weather in: ",city);
      }).
      catch(function(error){
        console.log("\n=======v= Weather Error =v==========");
        console.log(error,"\n");
      });
});


app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname + '/page.html'));
    console.log("\n===========v= Action =v==============");
    console.log("          Going to main page\n");
});


app.listen(PORT, function(){
    console.log("\n===========v= Server =v==============");
    console.log('  Server is running on PORT:',PORT);
});
