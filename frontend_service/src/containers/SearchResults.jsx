import React, { useEffect, useState } from 'react';
import { Container } from 'react-bootstrap';

import BookCard from '../components/BookCard';

import { getBooks, getLangs, getGenres } from '../helpers';
import { useQuery } from '../hooks';

export default function SearchResults() {
  const [books, setBooks] = useState([]);
  const [langsMeta, setLangsMeta] = useState([]);
  const [genresMeta, setGenresMeta] = useState({});

  const filters = useQuery();

  useEffect(() => {
    Promise.all([
      getLangs().then(langsMeta => setLangsMeta(langsMeta)),
      getGenres().then(genres => setGenresMeta(Object.assign({}, ...Object.values(genres)))),
    ]).then(() => getBooks(filters).then(books => setBooks(books)))
  }, []);

  return (
    <div className="results-page">
      <Container>
        <div className="content">
          {
            !books.length ? 'loading...' : books.map(book => {
              return (
                <BookCard
                  book={book}
                  langsMeta={langsMeta}
                  genresMeta={genresMeta}
                />
              );
            })
          }
        </div>
      </Container>
    </div>
  );
}
