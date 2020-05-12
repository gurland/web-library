'use strict';


/**
 * Add new review
 *
 * body Body 
 * bookId UUID Book unique ID
 * no response value expected for this operation
 **/
exports.addBookReview = function(body,bookId) {
  return new Promise(function(resolve, reject) {
    resolve();
  });
}


/**
 * Get book by it's unique ID
 * Get book detail by UUID
 *
 * bookId UUID Book unique ID
 * returns Book
 **/
exports.getBookById = function(bookId) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = {
  "cover" : "",
  "src_lang" : "src_lang",
  "genres" : [ "genres", "genres" ],
  "id" : "046b6c7f-0b8a-43b9-b35d-6489e6daee91",
  "title" : "title",
  "lang" : "lang",
  "authors" : [ "authors", "authors" ]
};
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}


/**
 * Get user reviews for book
 * Get user reviews for book
 *
 * bookId UUID Book unique ID
 * returns List
 **/
exports.getBookReviews = function(bookId) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = [ {
  "date" : "2000-01-23T04:56:07.000+00:00",
  "author" : "author",
  "rating" : 1,
  "id" : "id",
  "text" : "text"
}, {
  "date" : "2000-01-23T04:56:07.000+00:00",
  "author" : "author",
  "rating" : 1,
  "id" : "id",
  "text" : "text"
} ];
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}


/**
 * Returns localized categorized genres
 * By passing in ISO 639-1 language code you can get translated genres and its categories names 
 *
 * language String two-letter language code (optional)
 * returns GenreCategory
 **/
exports.getGenres = function(language) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = {
  "key" : {
    "key" : ""
  }
};
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}


/**
 * Finds books by given filters
 * Provide various filters and parameters to get needed books
 *
 * limit Integer limits the number of returned books (optional)
 * title String book's full or partial title, case independent (optional)
 * authors List book's authors list (optional)
 * genres List genres list (optional)
 * language String two-letter language code of which book is written in (optional)
 * rating Float book's user rating (optional)
 * returns List
 **/
exports.searchBooks = function(limit,title,authors,genres,language,rating) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = [ {
  "cover" : "",
  "src_lang" : "src_lang",
  "genres" : [ "genres", "genres" ],
  "id" : "046b6c7f-0b8a-43b9-b35d-6489e6daee91",
  "title" : "title",
  "lang" : "lang",
  "authors" : [ "authors", "authors" ]
}, {
  "cover" : "",
  "src_lang" : "src_lang",
  "genres" : [ "genres", "genres" ],
  "id" : "046b6c7f-0b8a-43b9-b35d-6489e6daee91",
  "title" : "title",
  "lang" : "lang",
  "authors" : [ "authors", "authors" ]
} ];
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}


/**
 * Returns matching author names, used in autocomplete
 * Search authors names by query string
 *
 * name String author's full or partial name, case independent (optional)
 * limit Integer limits the number of found authors names (optional)
 * returns List
 **/
exports.suggestAuthors = function(name,limit) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = [ "[\"Тарас Шевченко\",\"Тарас Шевчук\",\"Тарас Шевчушко\"]", "[\"Тарас Шевченко\",\"Тарас Шевчук\",\"Тарас Шевчушко\"]" ];
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}

