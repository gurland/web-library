import React, { useEffect, useState } from 'react';
import { Container, Spinner } from 'react-bootstrap';

import { BookCard } from '../components';

import { getBooks, getLangs, getGenres } from '../helpers';
import { useQuery } from '../hooks';

export default function SearchResults() {
  const [books, setBooks] = useState([]);
  const [langsMeta, setLangsMeta] = useState([]);
  const [genresMeta, setGenresMeta] = useState({});
  const [loading, setLoading] = useState(true);

  const filters = useQuery();

  useEffect(() => {
    Promise.all([
      getLangs().then(langsMeta => setLangsMeta(langsMeta)),
      getGenres().then(genres => setGenresMeta(Object.assign({}, ...Object.values(genres)))),
    ]).then(() => getBooks(filters).then(books => {
      setBooks(books)
      setLoading(false);
    }))
  }, []);

  const bookCards = books.map(book => {
    return (
      <BookCard
        book={book}
        langsMeta={langsMeta}
        genresMeta={genresMeta}
        key={book._id}
      />
    );
  })

  return (
    <div className="results-page">
      <Container>
        <div className="content">
          {
            loading
              ? <Spinner
                animation="border"
                variant="primary"
              />
              : bookCards.length
                  ? bookCards
                  : <span style={{fontSize: '2rem'}}>Нічого не знайдено...</span>
          }
        </div>
      </Container>
    </div>
  );
}
