import React from 'react';

import { Container, Card } from 'react-bootstrap';
import notFoundImage from '../assets/images/404.jpg';
import { books } from '../helpers/mock.api.data';

export default function SearchResults() {
  return (
    <div className="results-page">
      <Container>
        <div className="content">
          {
            books.map(book => {
              return (
                <Card key={book.id}>
                  <Card.Img variant="left" src={notFoundImage} width="128" height="128" />
                  <Card.Body>
                    <Card.Title><a href={book.id}>{ book.title }</a></Card.Title>
                    <Card.Subtitle className="mb-2 text-muted">{ book.authors.join(', ') }</Card.Subtitle>
                  </Card.Body>
                </Card>
              );
            })
          }
        </div>
      </Container>
    </div>
  );
}
