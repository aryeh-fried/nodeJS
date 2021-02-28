// Helpers for various tasks

//Dependencies
var crypto = require('crypto');
var config= require('./config')

// Container for all the helpers

var helpers = {};


// Parse a JSON  string to an object in all cases , without throwing
helpers.parseJsonToObject = (str)=>{
  try {
    var obj = JSON.parse(str);
    return obj;
  } catch (e) {
    console.log(e);
    return{};
  }
}
// Create  a SHA256 hash

helpers.hash = (password)=>{
  if (typeof(password)=='string' && password.length>0) {
    var hash = crypto.createHmac('sha256',config.hashingSecret).update(password).digest('hex');
    return hash;
  } else {
    return false;
  }
};








//Export the helpers module
module.exports = helpers;
