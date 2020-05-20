import React from 'react';

import { Card } from 'react-bootstrap';
import { fromSource } from '../helpers';
import notFoundImage from '../assets/images/404.jpg';

export default function BookCard({ book }) {
  return (
    <Card key={book._id} className="book-card">
      <div className="img-wrapper">
        <Card.Img
          variant="left"
          src={fromSource(book.book_cover) || notFoundImage}
          className={book.book_cover ? 'native-cover' : null}
        />
      </div>
      <Card.Body>
        <Card.Title><a href={book._id}>{ book.title }</a></Card.Title>
        <Card.Subtitle className="mb-2 text-muted">{ book.author.join(', ') }</Card.Subtitle>
        <hr/>
        <div className="additional-info">
          <Card.Subtitle
            className="mb-2 text-muted additional-info-element"
          >
            Жанри: жанр1, жанр2
          </Card.Subtitle>
          <Card.Subtitle
            className="mb-2 text-muted additional-info-element"
          >
            Мова: { book.lang }
          </Card.Subtitle>
          {
            book.src_lang && (
              <Card.Subtitle
                className="mb-2 text-muted additional-info-element"
              >
                Мова оригіналу: {book.src_lang}
              </Card.Subtitle>
            )
          }
          {
            book.isbn && (
              <Card.Subtitle
              className="mb-2 text-muted additional-info-element"
              >
              ISBN: { book.isbn }
              </Card.Subtitle>
            )
          }

        </div>
      </Card.Body>
    </Card>
  );
}