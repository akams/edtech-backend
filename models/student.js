var db = require('../database/mongodb');

exports.find = function(query) {
  var collection = db.get().collection('students');
  var promise = new Promise((resolve, reject) => {
    collection.findOne(query, function(err, res) {
      if (err) return reject(err);
      return resolve(res);
    });
  });
  return promise;
}


exports.insert = function(data, many = false) {
  const collection = db.get().collection('students');
  let promise;
  if (many) {
    promise = new Promise((resolve, reject) => {
      collection.insertMany(data, function(err, res)  {
        if (err) return reject(err);
        console.log("Number of documents inserted: " + res.insertedCount);
        return resolve(res);
      });
    });
  }
  else {
    promise = new Promise((resolve, reject) => {
      collection.insertOne(data, function(err, res) {
        if (err) return reject(err);
        return resolve(res);
      });
    });
  }
  return promise;
}
