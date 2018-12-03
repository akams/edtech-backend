var db = require('../database/mongodb');

exports.all = function() {
  var collection = db.get().collection('users');
  var promise = new Promise((resolve, reject) => {
    collection.find().sort().toArray(function(err, users) {
      if (err) return reject(err);
      return resolve(users);
    });
  });
  return promise;
}

exports.find = function(query) {
  var collection = db.get().collection('users');
  var promise = new Promise((resolve, reject) => {
    collection.findOne(query, function(err, res) {
      if (err) return reject(err);
      return resolve(res);
    });
  });
  return promise;
}

exports.insert = function(data, many = false) {
  var collection = db.get().collection('users');
  var promise;
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
