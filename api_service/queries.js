const bcrypt = require('bcrypt');

const isLanguageValid = require('iso-639-1').validate;
const makeSafeRegexp = require('./utils.js').makeSafeRegexp;

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

async function addUser(name, password){
    let hashedPass = await bcrypt.hash(password, 10);

    let db = await MongoClient.connect(MongoURI);
    let booksDb = db.db("books");

    booksDb.collection('users').ensureIndex("name", {unique: true})

    let insetionResult = booksDb.collection('users').insertOne({
        name: name,
        password: hashedPass
    });
    
    db.close();
    return insetionResult;
}

async function isUserPasswordCorrect(name, password){
    let db = await MongoClient.connect(MongoURI);
    let booksDb = db.db("books");

    booksDb.collection('users').ensureIndex("name", {unique: true})
        
    let userDoc = await booksDb.collection('users').findOne({ name: name });

    if (userDoc){
        passwordHash = userDoc.password

        let passwordsMatched = await bcrypt.compare(password, passwordHash);
        return passwordsMatched
    }
}

async function searchBooks(titlePart, authors, genres, languageCode, minRating, maxRating, limit){
    let db = await MongoClient.connect(MongoURI);
    let booksDb = db.db("books");
    
    const aggregations = [
        ... titlePart ? [{$match: {title: { $regex : makeSafeRegexp(titlePart)}}}] : [],
        ... authors.length > 0 ? [{$match: {authors: {$all: authors}}}] : [],
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

async function addBookReview(uuid, username, text, rating){
    let db = await MongoClient.connect(MongoURI);
    let booksDb = db.db("books");

    let author = await booksDb.collection('users').findOne({name: username})
    if (author){
        return booksDb.collection('books')
        .findOneAndUpdate(
            {_id: uuid},
            {$push: {
                reviews: {
                    text: text, 
                    rating: rating,
                    date: new Date(),
                    author: author.name
                }
            },
            $set: {
                avg_rating: rating
            }},  // TODO: set normal avg rating
            {
                returnOriginal: false,
                upsert: true
            })
    }
}

async function getAuthorsSuggestions(namePart, limit=20) {
    let regexp = makeSafeRegexp(namePart);

    let db = await MongoClient.connect(MongoURI);
    let booksDb = db.db("books");

    let aggregationResult = booksDb.collection('books').aggregate([
        {$match: {authors: {$elemMatch: { $regex : regexp}}}},
        {$limit : limit},
        {$unwind: {path: "$authors"}},
        {$group: {
            _id: null,
            uniqueAuthors: { $addToSet: '$authors' }
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
    searchBooks,
    addUser,
    isUserPasswordCorrect,
    addBookReview
}
