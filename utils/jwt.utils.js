// Imports
var jwt = require('jsonwebtoken');

const JWT_SIGN_SECRET = 'mon_secret_jwt';

// Exported functions
module.exports = {
  generateTokenForUser: function(userData, option = {
    expiresIn: '1h'
  }) {
    return jwt.sign({
      userId: userData._id,
      isAdmin: userData.isAdmin
    },
    process.env.JWT_SECRET || JWT_SIGN_SECRET,
    option
    )
  },
  parseAuthorization: function(authorization) {
    return (authorization != null) ? authorization.replace('Bearer ', '') : null;
  },
  getUserId: function(authorization) {
    var userId = -1;
    var token = module.exports.parseAuthorization(authorization);
    if(token != null) {
      try {
        var jwtToken = jwt.verify(token, process.env.JWT_SECRET || JWT_SIGN_SECRET);
        if(jwtToken != null)
          userId = jwtToken.userId;
      } catch(err) { }
    }
    return userId;
  }
}