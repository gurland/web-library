'use strict';

var utils = require('../utils/writer.js');
var Books = require('../service/BooksService');

module.exports.addBookReview = function addBookReview (req, res, next, body, bookId) {
  Books.addBookReview(body, bookId)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.getBookById = function getBookById (req, res, next, bookId) {
  Books.getBookById(bookId)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.getBookReviews = function getBookReviews (req, res, next, bookId) {
  Books.getBookReviews(bookId)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.getGenres = function getGenres (req, res, next, language) {
  Books.getGenres(language)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.searchBooks = function searchBooks (req, res, next, limit, title, authors, genres, language, rating) {
  Books.searchBooks(limit, title, authors, genres, language, rating)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.suggestAuthors = function suggestAuthors (req, res, next, name, limit) {
  Books.suggestAuthors(name, limit)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};
