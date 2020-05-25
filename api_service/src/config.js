const fs = require('fs');

const GENRES = JSON.parse(fs.readFileSync(__dirname + '/genres.json', 'utf8')) || {};
const LANGUAGES = JSON.parse(fs.readFileSync(__dirname + '/languages.json', 'utf8')) || {};

const JWTSECRET = process.env.JWT_SECRET || 'superTestJWTtoken';
const PORT = process.env.DEBUG_PORT || 80
const MONGO_URI = process.env.MONGO_URI || 'mongodb://root:test@localhost:27777/books?authSource=books'

module.exports = { GENRES, LANGUAGES, JWTSECRET, PORT, MONGO_URI}