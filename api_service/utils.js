const fs = require('fs');
const jwt = require('jsonwebtoken');

const GENRES = JSON.parse(fs.readFileSync(__dirname + '/genres.json', 'utf8'));
const LANGUAGES = JSON.parse(fs.readFileSync(__dirname + '/languages.json', 'utf8'));
const JWTSECRET = process.env.JWT_SECRET || 'superTestJWTtoken';

function makeSafeRegexp(substring) {
    return new RegExp(substring.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&'), 'i');
}

function authMiddleware (err, req, res, next) {
    if (err.name === 'UnauthorizedError') {
        res.status(401).send('invalid token');
    }
}

function generateAccessToken(username) {
    // expires after half and hour (1800 seconds = 30 minutes)
    return jwt.sign(username, JWTSECRET); // { expiresIn: '14d' }
}

module.exports = {
    makeSafeRegexp, authMiddleware, generateAccessToken,
    GENRES, LANGUAGES, JWTSECRET
};