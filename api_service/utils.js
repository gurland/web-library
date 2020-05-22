var fs = require('fs');

const GENRES = JSON.parse(fs.readFileSync(__dirname + '/genres.json', 'utf8'));
const LANGUAGES = JSON.parse(fs.readFileSync(__dirname + '/languages.json', 'utf8'));

function makeSafeRegexp(substring) {
    return new RegExp(substring.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&'), 'i');
}

module.exports = {makeSafeRegexp, GENRES, LANGUAGES};