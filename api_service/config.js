const fs = require('fs');

const GENRES = JSON.parse(fs.readFileSync(__dirname + '/genres.json', 'utf8')) || {};
const LANGUAGES = JSON.parse(fs.readFileSync(__dirname + '/languages.json', 'utf8')) || {};
const JWTSECRET = process.env.JWT_SECRET || 'superTestJWTtoken';

module.exports = { GENRES, LANGUAGES, JWTSECRET}