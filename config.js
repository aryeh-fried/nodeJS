/*
* Create and export configuratinon variables
*
*/

//Container for all the enviroments

var enviroments ={};

// Staging object
enviroments.staging = {
  'port':3000,
  'envName':'staging'
};

// Production enviroment

enviroments.production = {
  'port': 5000,
  'envName':'production'
};

// determine which envirment was passed as command-line argument
var currentEnviroment = typeof(process.env.NODE_ENV) == 'string'? process.env.NODE_ENV.toLowerCase():'';

//Check that the current enviroment is one of the enviroments above if not, default to staging
var enviromentToExport = typeof(enviroments[currentEnviroment]) == 'object' ? enviroments[currentEnviroment] : enviroments.staging;

//Export the module

//module.export = enviromentToExport;

exports.enviroments =   enviromentToExport;
