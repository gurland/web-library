const jwt = require('jsonwebtoken');

const { JWTSECRET } = require("./config");

function makeSafeRegexp(substring) {
    return new RegExp(substring.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&'), 'i');
}

function authMiddleware (err, req, res, next) {
    if (err.name === 'UnauthorizedError') {
        res.status(401).json({'message': err.message});
    }
}

function generateAccessToken(username) {
    return jwt.sign({"name": username}, JWTSECRET, { expiresIn: "14d" });
}

module.exports = {
    makeSafeRegexp, 
    authMiddleware, 
    generateAccessToken
};