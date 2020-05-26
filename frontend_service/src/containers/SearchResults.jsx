import React, { useEffect, useState } from 'react';
import { Container } from 'react-bootstrap';

import { BookCard, NotFoundSign, Spinner } from '../components';

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
