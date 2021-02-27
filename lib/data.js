// Libary for storing data

//Dependencies

var fs = require ('fs');
var path = require ('path');

//Container for the module (to be exported)
var lib = {};

//Base directory of the data folder
lib.baseDir = path.join(__dirname,'/../.data/');
//write data to a file
lib.create = (dir,file,data,callback)=>{
  //open the file for writing
  fs.open(lib.baseDir+dir+'/'+file+'.json','wx',(err,fileDescriptor)=>{
    if(!err && fileDescriptor){
      // convert data to string
      var stringData = JSON.stringify(data);
      //Write to file and close it
      fs.writeFile(fileDescriptor,stringData,(err)=>{
        if (!err) {
          fs.close(fileDescriptor,(err)=>{
            if (!err) {
              callback(false);
            } else {
              callback("Error in closing new file");
            }
          });
        } else {
          callback("Error writing to new file");
        }
      });
    }else {
      callback("could not create a new file it may already exist")
    }
  });
};
//Read Data from a file

lib.read = (dir,file,callback)=>{
  fs.readFile(lib.baseDir+dir+'/'+file+".json",'utf-8',(err,data)=>{
    callback(err,data);
  });
};

//Update data inside a newFile

lib.update = (dir,file,data,callback)=>{
  fs.open(lib.baseDir+dir+'/'+file+".json",'r+',(err,fileDescriptor)=>{
      if (!err && fileDescriptor) {
        //convert data to string
        var stringData = JSON.stringify(data);
        //Truncate the file
        fs.truncate(fileDescriptor,(err)=>{
          if (!err) {
            fs.writeFile(fileDescriptor,stringData,(err)=>{
              if (!err) {
                fs.close(fileDescriptor,(err)=>{
                  if (!err) {
                    callback(false);
                  } else {
                    callback("there was an error in closing the file!")
                  }
                });
              } else {
                callback('????');
              }
            })
          } else {
            callback("Error in truncating file")
          }
        });
      } else {
        callback('Could not open the file for update, it may not exist yet');

      }
  });
};

// Delete a file

lib.delete = (dir,file,callback)=>{
  //unlink the file
  fs.unlink(lib.baseDir+dir+'/'+file+'.json',(err)=>{
    if (!err) {
      callback(false)
    } else {
      callback("there was a error in deleting the file");
    }
  });
};


//Export the module
module.exports = lib;
