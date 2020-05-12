'use strict';

var utils = require('../utils/writer.js');
var Auth = require('../service/AuthService');

module.exports.loginUser = function loginUser (req, res, next, body) {
  Auth.loginUser(body)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.registerUser = function registerUser (req, res, next, body) {
  Auth.registerUser(body)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};
