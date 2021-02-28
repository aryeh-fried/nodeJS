/*
*Request handlers/Controllers
*
*/

//Dependencies

var _data = require('./data');
var helpers = require('./helpers')

//Define the handlers
var handlers = {};
//notFound handler
handlers.notFound = (data,callback)=>{
  callback(404);
};
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

handlers.users = (data,callback)=>{
  var httpMethods = ['get','post','put','delete'];
  if (httpMethods.indexOf(data.method)>-1) {
    handlers._users[data.method](data,callback);
  } else {
    callback(405);
  }
};

//Container for the users submethods
handlers._users={};


// Users - post
// Required data: firstName, lastName, phone, password, tosAgreement
// Optional data: none
handlers._users.post = function(data,callback){
  // Check that all required fields are filled out
  var firstName = typeof(data.payload.firstName) == 'string' && data.payload.firstName.trim().length > 0 ? data.payload.firstName.trim() : false;
  var lastName = typeof(data.payload.lastName) == 'string' && data.payload.lastName.trim().length > 0 ? data.payload.lastName.trim() : false;
  var phone = typeof(data.payload.phone) == 'string' && data.payload.phone.trim().length == 10 ? data.payload.phone.trim() : false;
  var password = typeof(data.payload.password) == 'string' && data.payload.password.trim().length > 0 ? data.payload.password.trim() : false;
  var tosAgreement = typeof(data.payload.tosAgreement) == 'boolean' && data.payload.tosAgreement == true ? true : false;

  if(firstName && lastName && phone && password && tosAgreement){
    // Make sure the user doesnt already exist
    _data.read('users',phone,function(err,data){
      if(err){
        // Hash the password
        var hashedPassword = helpers.hash(password);

        // Create the user object
        if(hashedPassword){
          var userObject = {
            'firstName' : firstName,
            'lastName' : lastName,
            'phone' : phone,
            'hashedPassword' : hashedPassword,
            'tosAgreement' : true
          };

          // Store the user
          _data.create('users',phone,userObject,function(err){
            if(!err){
              callback(200);
            } else {
              console.log(err);
              callback(500,{'Error' : 'Could not create the new user'});
            }
          });
        } else {
          callback(500,{'Error' : 'Could not hash the user\'s password.'});
        }

      } else {
        // User alread exists
        callback(400,{'Error' : 'A user with that phone number already exists'});
      }
    });

  } else {
    callback(400,{'Error' : 'Missing required fields'});
  }

};

//users - get

handlers._users.get = (data,callback)=>{

  

};
//users - put

handlers._users.put = (data,callback)=>{

};
//users - delete

handlers._users.delete = (data,callback)=>{

};

//not found handler

//define a reqeust router
module.exports = handlers;
