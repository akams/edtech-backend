var CONSTANT = require('../../config/constant');

exports.register = function(req, res, next) {
  console.log('1')
  const params = createBody(req);
  validatorData(params, res);
  console.log('test succeed')
  return res.sendStatus(200);
}

function createBody(req) {
  console.log(req.body);
  return {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    password: req.body.password,
    username: req.body.username,
    birthDate: req.body.birthDate,
    email: req.body.email,
    // geoloc: {
    //   country: req.body.geoloc.country,
    //   city: req.body.geoloc.city || '',
    //   cp: req.body.geoloc.CP || '',
    //   address: req.body.geoloc.address || '',
    // },
    // billing: {
    //   type: req.body.typeBills,
    // },
    // subscribeYear: {
    //   degree: req.body.degree,
    //   promoYear: req.body.promoYear,
    // },
  }
}

function validatorData(params, res) {
  if (params.firstName.length >= 15 || params.firstName.length <= 1) {
    return res.status(400).json({ 'error': 'wrong firstname (must be length 5 - 12)' });
  }
  if (params.lastName.length >= 13 || params.lastName.length <= 4) {
    return res.status(400).json({ 'error': 'wrong lastname (must be length 5 - 12)' });
  }
  if (params.username.length >= 13 || params.username.length <= 4) {
    return res.status(400).json({ 'error': 'wrong username (must be length 5 - 12)' });
  }
  
  if (!CONSTANT.EMAIL_REGEX.test(params.email)) {
    return res.status(400).json({ 'error': 'email is not valid' });
  }

  if (!CONSTANT.PASSWORD_REGEX.test(params.password)) {
    return res.status(400).json({ 'error': 'password invalid (must length 4 - 8 and include 1 number at least)' });
  }
}

// {
//   "firstName": "ndjawe-akambiet",
//   "lastName": "Eric",
//   "password": "Eric",
//   "username": "ricoooo",
//   "birthDate": "07/07/1992",
//   "email": "eric@test.fr",
//   "geoloc": {
//    "country": "Gabon",
//    "city": "Libreville",
//    "CP": "BP8999",
//    "address": ""
//   },
//   "billing": {
//    "status": "IN_PROGRESS",
//    "type": 1
//   },
//   "subscribeYear": {
//    "degree": "L1",
//    "promoYear": "2020"
//   }
//  }