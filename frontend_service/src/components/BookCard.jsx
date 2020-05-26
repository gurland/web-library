import React from 'react';

import { Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { fromSource, findMeta, createLinks, joinComponents, getKeyByValue, clarify } from '../helpers';
import notFoundImage from '../assets/images/404.jpg';

export default function BookCard({ book, lang, srcLang, genresMeta }) {
  // const lang = findMeta(langsMeta, book.lang);
  const genres = clarify(book.genres.map(genre => genresMeta[genre]));


  return (
    <Card className="book-card">
      <div className="img-wrapper">
        <Card.Img
          variant="left"
          src={fromSource(book.cover) || notFoundImage}
          className={book.book_cover ? 'native-cover' : null}
        />
      </div>
      <Card.Body>
        <Card.Title><Link to={`/books/${book._id}`}>{ book.title }</Link></Card.Title>
        <Card.Subtitle
          className="mb-2 text-muted"
        >
          {
            joinComponents(createLinks(book.authors, 'authors'))
          }
        </Card.Subtitle>
        <hr/>
        <div className="additional-info">
          {
            (
              <Card.Subtitle
                className="mb-2 text-muted additional-info-element"
              >
                Жанри: { !genres.length
                ? 'Інше'
                : joinComponents(
                  createLinks(genres, 'genres', (localizedGenre) => getKeyByValue(genresMeta, localizedGenre))
                )
              }
              </Card.Subtitle>
            )
          }
          <Card.Subtitle
            className="mb-2 text-muted additional-info-element"
          >
            Мова: {
              <Link
                to={`/results?language=${book.lang}`}
                key={book.lang}
              >
                {lang}
              </Link>
            }
          </Card.Subtitle>
          {
            book.src_lang && (
              <Card.Subtitle
                className="mb-2 text-muted additional-info-element"
              >
                Мова оригіналу: { srcLang }
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