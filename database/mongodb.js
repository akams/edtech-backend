var MongoClient = require('mongodb').MongoClient;
var ObjectId    = require('mongodb').ObjectId;

const state = {
  db: null,
}

exports.connect = function(url, done) {
  if (state.db) return done()

  MongoClient.connect(url, function(err, db) {
    if (err) return done(err)
    state.db = db.db("edtech-school")
    done()
  })
}

exports.get = function() {
  return state.db;
}
exports.createIdMongo = function(id) {
  return new ObjectId(id);
}

exports.close = function(done) {
  if (state.db) {
    state.db.close(function(err, result) {
      state.db = null
      state.mode = null
      done(err)
    })
  }
}