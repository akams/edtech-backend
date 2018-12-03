var mongodb = require('../database/mongodb');
const constant = require('../config/constant');
const ENV = constant.ENV;
// Routes
module.exports = {
  pingDb: function(req, res, next) {
    
    mongodb.connect(`mongodb://${ENV}:27017/`, function(err, db) {
      if (err) {
        return res.send('Unable to connect to Mongo Database.');
      }
      return res.send("Connected to Mongo Database.");
    })
  }
}