/*
*Primary file for the API
*
*
*/

// Dependencies
var http =  require('http');
var url = require('url')
var stringDecoder = require('string_decoder').StringDecoder;
//var config = require( './config.js');
var config = require('./config.js');// not working for some reason...
var _data = require('./lib/data');
var router = require('./router');
//@TODO: delete this
//TESTING

//testing creating a new json file

// _data.create('test','newFile',{'foo':'bar'},(err)=>{
//   console.log('this was the error', err);
// });

//testing reading data from a file

// _data.read('test','newFile',(err,data)=>{
//   console.log('the data is ',data);
// });


//testing updating the file

// _data.update('test','newFile',{'boo':'far'},(err)=>{
//    console.log('this was the error', err);
//  });

// //testing deleting a file

// _data.delete('test','newFile',(err)=>{
//     console.log('this was the error', err);
//     });

router.myRouter();

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
    //choose the handler this request should go to
    var chosenHandler = typeof(router[trimmedPath]) !== 'undefined' ? router[trimmedPath]: handlers.notFound

    //construct the data object to send to the handler

    var data = {
      'trimmedPath': trimmedPath,
      'queryStringObject': queryStringObject,
      'method': method,
      'headers':headers,
      'payload':buffer
    };

    //route the request to the  handler specified in the router

    chosenHandler('data',(statusCode,payload)=>{
      //use the status code called back by the handler , or default
      statusCode = typeof(statusCode) == 'number' ? statusCode : 200;
      //Ues the payload called back by the handler , or default to
      payload = typeof(payload) == 'object' ? payload: {};
      //convert the payload to a string
      var payloadString = JSON.stringify(payload);

      // return the response
      //this line is for showing the payload receive in a json format
      res.setHeader('content-Type','application/json')
      res.writeHead(statusCode);
      res.end(payloadString);

      console.log('returning this response :', statusCode, payloadString)

    });

  });

});

// start the server and have it listen on port 3000
server.listen(3000,()=>{
  console.log("The server is listening  on port : 3000 now");
})
//define the handler
var handlers = {};

//sample handler

handlers.sample = (data,callback)=>{
  //callback a http status code and a payload object
  callback(406,{'name': 'sample handler'});
};
// ping handler
handlers.ping = (data,callback)=>{
  //callback a http status code and a payload object
  callback(200,{'ping': 'ping'});
};


//not found handler

handlers.notFound = (data,callback)=>{
  callback(404);
};
//define a reqeust router

var router = {
  'sample': handlers.sample,
  'ping':handlers.ping

};
