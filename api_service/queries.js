const makeSafeRegexp = require('./utils.js').makeSafeRegexp;
const isLanguageValid = require('iso-639-1').validate;
const GENRES = require('./utils.js').GENRES;
const LANGUAGES = require('./utils.js').LANGUAGES;

const MongoClient = require('mongodb').MongoClient;
const MongoURI = process.env.MONGO_URI || 'mongodb://root:test@localhost:27777/books?authSource=books'

function getLocalizedGenres(languageCode){
    return GENRES[languageCode] || {}
}

function getLocalizedLanguages(languageCode){
    return LANGUAGES[languageCode] || {}
}

async function searchBooks(titlePart, authors, genres, languageCode, minRating, maxRating, limit){
    let db = await MongoClient.connect(MongoURI);
    let booksDb = db.db("books");
    
    const aggregations = [
        ... titlePart ? [{$match: {title: { $regex : makeSafeRegexp(titlePart)}}}] : [],
        ... authors.length > 0 ? [{$match: {author: {$all: authors}}}] : [],
        ... genres.length > 0 ? [{$match: {genres: {$all: genres}}}] : [],
        ... isLanguageValid(languageCode) ? [{$match: {lang: languageCode}}] : [],
        ... (0 < minRating && maxRating < 10) ? [{$match: {avg_rating: {$gt : minRating, $lt : maxRating}}}] : [],
        {$limit : limit}        
    ];

    let books = booksDb.collection('books').aggregate(aggregations).toArray();
    
    db.close();
    return books;
}

async function getBookById(uuid){
    let db = await MongoClient.connect(MongoURI);
    let booksDb = db.db("books");

    let book = booksDb.collection('books').findOne({_id: uuid})
    
    db.close();
    return book;
}

async function getAuthorsSuggestions(namePart, limit=20) {
    let regexp = makeSafeRegexp(namePart);

    let db = await MongoClient.connect(MongoURI);
    let booksDb = db.db("books");

    let aggregationResult = booksDb.collection('books').aggregate([
        {$match: {author: {$elemMatch: { $regex : regexp}}}},
        {$limit : limit},
        {$unwind: {path: "$author"}},
        {$group: {
            _id: null,
            uniqueAuthors: { $addToSet: '$author' }
          }
        },
        
    ]).toArray();
    db.close();
    return aggregationResult;
}

module.exports = {
    getLocalizedGenres,
    getLocalizedLanguages,
    getAuthorsSuggestions,
    getBookById,
    searchBooks    
}
