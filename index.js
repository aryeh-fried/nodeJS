/*
*Primary file for the API
*
*
*/

// Dependencies
var http =  require('http');
var url = require('url')
var stringDecoder = require('string_decoder').StringDecoder;

// the server should respond to all requests with a string

var server = http.createServer((req,res)=>{
  // get the url and parse it
  var parseUrl = url.parse(req.url,true);
  // Get the path
  var path = parseUrl.pathname;
  var trimmedPath = path.replace(/^\/+|\/+$/g,'');
  //get the query string as an object
  var queryStringObject = parseUrl.query;
  //Get the http method
  var method = req.method.toLowerCase();
  //Get the header as an object
  var headers = req.headers;
  //Get the payload, if any
  var decoder = new stringDecoder('utf-8');
  var buffer='';
  req.on('data',(data)=>{
    buffer += decoder.write(data);
  });
  req.on('end',()=>{
    buffer += decoder.end();
    res.end('Hello World\n');
    console.log('request recieved on path:',trimmedPath,"with this method",method);
    console.log('with these queries:' , queryStringObject);
    console.log('request was recieved with those headers',headers);
    console.log('request recieved with this payload:',buffer)
  })
  //send the response
  //Log the request path

});




// start the server and have it listen on port 3000
server.listen(3000,()=>{
  console.log("The server is listening  on port 3000 now");
})
