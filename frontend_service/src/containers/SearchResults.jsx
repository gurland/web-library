import React from 'react';

import { Container, Card } from 'react-bootstrap';
import notFoundImage from '../assets/images/404.jpg';

export default function SearchResults() {
  const books = [
    {
      "id": "3fa85f64-1717-4562-b3fc-2c963f66afa6",
      "title": "string",
      "authors": [
        "string","string","string"
      ],
      "genres": [
        "string"
      ],
      "src_lang": "string",
      "lang": "string",
      "cover": "string"
    },
    {
      "id": "3fa85f64-5717-4563-b3fc-2c963f66afa6",
      "title": "string",
      "authors": [
        "string"
      ],
      "genres": [
        "string"
      ],
      "src_lang": "string",
      "lang": "string",
      "cover": "string"
    },
    {
      "id": "3fa85f64-5417-4562-b3fc-2c963f66afa6",
      "title": "string",
      "authors": [
        "string"
      ],
      "genres": [
        "string"
      ],
      "src_lang": "string",
      "lang": "string",
      "cover": "string"
    },
    {
      "id": "3fa85f64-5717-4462-b3fc-2c963f66afa6",
      "title": "string",
      "authors": [
        "string"
      ],
      "genres": [
        "string"
      ],
      "src_lang": "string",
      "lang": "string",
      "cover": "string"
    },
    {
      "id": "3fa85f64-1717-4562-b3fc-2c963f66afa6",
      "title": "string",
      "authors": [
        "string","string","string"
      ],
      "genres": [
        "string"
      ],
      "src_lang": "string",
      "lang": "string",
      "cover": "string"
    },
    {
      "id": "3fa85f64-5717-4563-b3fc-2c963f66afa6",
      "title": "string",
      "authors": [
        "string"
      ],
      "genres": [
        "string"
      ],
      "src_lang": "string",
      "lang": "string",
      "cover": "string"
    },
    {
      "id": "3fa85f64-5417-4562-b3fc-2c963f66afa6",
      "title": "string",
      "authors": [
        "string"
      ],
      "genres": [
        "string"
      ],
      "src_lang": "string",
      "lang": "string",
      "cover": "string"
    },
    {
      "id": "3fa85f64-5717-4462-b3fc-2c963f66afa6",
      "title": "string",
      "authors": [
        "string"
      ],
      "genres": [
        "string"
      ],
      "src_lang": "string",
      "lang": "string",
      "cover": "string"
    },
    {
      "id": "3fa85f64-1717-4562-b3fc-2c963f66afa6",
      "title": "string",
      "authors": [
        "string","string","string"
      ],
      "genres": [
        "string"
      ],
      "src_lang": "string",
      "lang": "string",
      "cover": "string"
    },
    {
      "id": "3fa85f64-5717-4563-b3fc-2c963f66afa6",
      "title": "string",
      "authors": [
        "string"
      ],
      "genres": [
        "string"
      ],
      "src_lang": "string",
      "lang": "string",
      "cover": "string"
    },
    {
      "id": "3fa85f64-5417-4562-b3fc-2c963f66afa6",
      "title": "string",
      "authors": [
        "string"
      ],
      "genres": [
        "string"
      ],
      "src_lang": "string",
      "lang": "string",
      "cover": "string"
    },
    {
      "id": "3fa85f64-5717-4462-b3fc-2c963f66afa6",
      "title": "string",
      "authors": [
        "string"
      ],
      "genres": [
        "string"
      ],
      "src_lang": "string",
      "lang": "string",
      "cover": "string"
    },

  ];

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
