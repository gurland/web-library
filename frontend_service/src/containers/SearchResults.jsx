import React, { useEffect, useState } from 'react';
import { Container } from 'react-bootstrap';

import BookCard from '../components/BookCard';

import { getBooks } from '../helpers';
import { useQuery } from '../hooks';

export default function SearchResults() {
  const [books, setBooks] = useState([]);
  const filters = useQuery();

  useEffect(() => {
    getBooks(filters).then(books => setBooks(books));
  });

  return (
    <div className="results-page">
      <Container>
        <div className="content">
          {
            books.map(book => {
              return (
                <BookCard book={book} />
              );
            })
          }
        </div>
      </Container>
    </div>
  );
}
