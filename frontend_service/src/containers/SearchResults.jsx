import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

import { Container } from 'react-bootstrap';

import { BookCard, NotFoundSign, Spinner } from '../components';
import { getBooks, getLangs, getGenres } from '../helpers';
import { useQuery } from '../hooks';

export default function SearchResults(props) {
  const [books, setBooks] = useState([]);
  const [langsMeta, setLangsMeta] = useState([]);
  const [genresMeta, setGenresMeta] = useState({});
  const [loading, setLoading] = useState(true);

  const location = useLocation();
  const filters = useQuery(location.search);

  useEffect(() => {
    setLoading(true);
    Promise.all([
      getLangs().then(langsMeta => setLangsMeta(langsMeta)),
      getGenres().then(genres => setGenresMeta(Object.assign({}, ...Object.values(genres)))),
    ]).then(() => getBooks(filters).then(books => {
      setBooks(books)
      setLoading(false);
    }))

    console.log('test');
  }, [location.search]);

  const bookCards = books.map(book => {
    return (
      <BookCard
        book={book}
        lang={langsMeta[book.lang]}
        srcLang={langsMeta[book.src_lang]}
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
              ? <Spinner />
              : bookCards.length
                  ? bookCards
                  : <NotFoundSign />
          }
        </div>
      </Container>
    </div>
  );
}
