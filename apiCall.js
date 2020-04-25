var weather;
var app = require('./app');
var http = require('http');//prepare for the js server
const axios = require('axios').default;//tool to do the api call

axios({//api call
  method: 'get',//getting the response
  url: 'api.openweathermap.org/data/2.5/weather',//api url
  q:'Boston',//This is the city from which you want to get the weather
  appid:'99419ce789d1f71cd2286f1373299291'//This is the api key
})
  .then(function (response) {
    console.log(response);//print out the data we get from the api
  });

var server = http.createServer(function(req, res) {//creating the js server
    res.writeHead(200, { "Content-type": "text/plain" });
    res.end('test');
});

server.listen(3000, function() {
    console.log('Server is running at 3000')
    /*If the server is created successfully,
      it should be running on the port 3000.
      The number of the port can be changed.
    */
});
