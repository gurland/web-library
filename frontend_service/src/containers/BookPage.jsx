import React, { useState, useEffect } from 'react';

import { useParams } from 'react-router-dom';
import { Container, Spinner, Card, Button } from 'react-bootstrap';
import { NotFoundSign } from '../components';

import {
  clarify,
  createLinks, findMeta,
  fromSource,
  getBook,
  getKeyByValue,
  getMetadata,
  joinComponents,
} from '../helpers';

import notFoundImage from '../assets/images/404.jpg';

export default function BookPage() {
  const [book, setBook] = useState({});

  const [loading, setLoading] = useState(true);
  const [langsMeta, setLangsMeta] = useState([]);
  const [genresMeta, setGenresMeta] = useState({});

  const { id } = useParams();

  useEffect(() => {
    async function fetchData() {
      const { langsMeta, genresMeta } = await getMetadata();
      const book = await getBook(id);

      setLangsMeta(langsMeta);
      setGenresMeta(genresMeta);
      setBook(book);
    }

    fetchData().then(() => {
      setLoading(false)
    });
  }, []);

  const genres = book.genres && clarify(book.genres.map(genre => genresMeta[genre]));
  const lang = book.lang && findMeta(langsMeta, book.lang);

  const bookInfo = !Object.keys(book).length ? NotFoundSign : (
    <div className="content-wrapper">
      <Card>
        <Card.Img
          variant="top"
          src={fromSource(book.book_cover) || notFoundImage}
        />
        <Card.Body>

          <Card.Title style={{fontSize: '1.5rem'}}>
            {book.title}
          </Card.Title>
          <Card.Subtitle
            className="mb-2 text-muted"
          >
            {
              joinComponents(createLinks(book.author, 'authors')) //todo change author to authors
            }
          </Card.Subtitle>
          <hr/>
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
            <a
              href={`/results?language=${book.lang}`}
              key={book.lang}
            >
              {lang}
            </a>
          }
          </Card.Subtitle>
          {
            book.src_lang && (
              <Card.Subtitle
                className="mb-2 text-muted additional-info-element"
              >
                Мова оригіналу: { findMeta(langsMeta, book.src_lang) }
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
          <hr/>
          <a href={`/reader?bookId=${book._id}`}>
            <Button variant="primary" style={{width: '100%'}}>Читати онлайн</Button>
          </a>
        </Card.Body>
      </Card>
      <Card>

      </Card>
    </div>
  );

  return (
    <div className="book-page">
      <Container>
        <div className="content">
          {
            loading
              ? <Spinner
                animation="border"
                variant="primary"
              />
              : bookInfo
          }
        </div>
      </Container>
    </div>
  );
}