const express = require('express');
const bodyParser = require('body-parser')
const { check, validationResult } = require('express-validator');
const isLanguageValid = require('iso-639-1').validate;
const queries = require('./queries.js');
const cors = require('cors');
const expressJWT = require('express-jwt');

const { JWTSECRET, PORT } = require('./config.js');
const { authMiddleware, generateAccessToken } = require('./utils.js');

const jwtMiddleware = expressJWT({ secret: JWTSECRET });

const app = express();

app.use(cors());
app.use(bodyParser.json())

app.get('/api/v1/test', function (req, res) {
    res.send('API service is running!')
})

app.get('/api/v1/genres', function (req, res) {
    let languageCode = req.query.language;
    if (isLanguageValid(languageCode)){
        res.json(
            queries.getLocalizedGenres(languageCode)
        )
    } else {
        res.status(400).json({'message': 'invalid language code'})
    }
})

app.get('/api/v1/languages', function (req, res) {
    let languageCode = req.query.language;
    if (isLanguageValid(languageCode)){
        res.json(
            queries.getLocalizedLanguages(languageCode)
        )
    } else {
        res.status(400).json({'message': 'invalid language code'})
    }
})

app.get('/api/v1/authors', function (req, res) {
    let namePart = req.query.name;
    let limit = parseInt(req.query.limit) || 20;
    if (namePart && Number.isInteger(limit)){
        queries.getAuthorsSuggestions(namePart, limit).then(function(aggregationResult){
            let authorNames = [];
            if(aggregationResult.length > 0){
                if ('uniqueAuthors' in aggregationResult[0]){
                    authorNames = aggregationResult[0].uniqueAuthors;
                }
            }
            res.json(authorNames);
        })
    } else {
        res.status(400).json({'message': 'invalid parameters'})
    }
})

app.get('/api/v1/books', function (req, res) {
    let authors = (req.query.authors || '').split(',').filter(e => e !== "");
    let genres = (req.query.genres || '').split(',').filter(e => e !== "");
    let language = req.query.language;
    let title = req.query.title;
    let minRating = parseFloat(req.query.minRating) || 0;
    let maxRating = parseFloat(req.query.maxRating) || 10;
    let limit = parseInt(req.query.limit) || 20;

    queries.searchBooks(title, authors, genres, language, minRating, maxRating, limit).then(function(booksResult){
        if(booksResult){
            res.json(booksResult);
        } else {
            res.json([])
        }
    });
})

app.get('/api/v1/books/:bookId', function (req, res) {
    let bookId = req.params.bookId || "";
    queries.getBookById(bookId).then(function(bookResult){
        if(bookResult){
            res.json(bookResult);
        } else {
            res.status(404).json({'message': 'book not found'})
        }
    });
})

app.post('/api/v1/books/:bookId/reviews', [
    check('text').exists(),
    check('rating').isInt({ min: 1, max: 10 })
  ],
  jwtMiddleware, authMiddleware, async function (req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    let text = req.body.text;
    let rating = req.body.rating;
    let bookId = req.params.bookId || "";

    try{
        await queries.addBookReview(bookId, req.user.name, text, rating);
        res.status(200).json({"message": "Review added!"});
    } catch (err) {
        res.status(400).json({"message": err.message})
    }
})

app.post('/api/v1/auth/register', [
    check('name').isAlphanumeric(),
    check('password').isLength({ min: 5 })
  ], 
  async function (req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    let name = req.body.name;
    let password = req.body.password;
    
    try{
        await queries.addUser(name, password);
        return res.json({"access_token": generateAccessToken(name)});
    } catch (err){
        if (err.code === 11000){
            return res.status(409).json({'message': "Username is not unique"})
        }
        return res.status(422).json({'message': err.message})
    }
})

app.post('/api/v1/auth/login', [
    check('name').isAlphanumeric(),
    check('password').isLength({ min: 5 })
  ], 
  async function (req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    let name = req.body.name;
    let password = req.body.password;
    
    try{
        let passwordMatched = await queries.isUserPasswordCorrect(name, password);
        if (passwordMatched){
            return res.json({"access_token": generateAccessToken(name)})
        } else {
            res.status(400).json({'message': "Wrong credentials!"})
        }
    } catch (err){
        return res.status(422).json({'message': err.message})
    }
})

app.listen(PORT, () => console.log(`Example app listening at http://localhost:${PORT}`))