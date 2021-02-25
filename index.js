/*
*Primary file for the API
*
*
*/

// Dependencies
var http =  require('http');
var url = require('url')

// the server should respond to all requests with a string

var server = http.createServer((req,res)=>{
  // get the url and parse it
  var parseUrl = url.parse(req.url,true);
  // Get the path
  var path = parseUrl.pathname;
  var trimmedPath = path.replace(/^\/+|\/+$/g,'');
  //send the response
  res.end('Hello World\n');
  //Log the request path
  console.log('request recieved on path:',trimmedPath);
});




// start the server and have it listen on port 3000
server.listen(3000,()=>{
  console.log("The server is listening  on port 3000 now");
})
