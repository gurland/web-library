const express = require('express');
const isLanguageValid = require('iso-639-1').validate;
const queries = require('./queries.js');

const app = express();
const port = 80;


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
    let maxRating = parseFloat(req.query.maxRating) || 0;
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

app.get('/api/v1/books/:bookId/reviews', function (req, res) {
    res.send('book rewiews!')
})

app.post('/api/v1/books/:bookId/reviews', function (req, res) {
    res.send('add book rewiew!')
})

app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))