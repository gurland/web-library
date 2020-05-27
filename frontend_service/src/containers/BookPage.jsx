import React, { useState, useEffect } from 'react';

import { Link, useParams } from 'react-router-dom';
import { Container, Card, Button } from 'react-bootstrap';
import ReactStars from 'react-stars';

import { NotFoundSign, Spinner} from '../components';
import CommentSection from './CommentSection';

import {
  clarify,
  createLinks, findMeta,
  fromSource,
  getBook,
  getKeyByValue,
  getMetadata, getReviews,
  joinComponents, postReview,
} from '../helpers';

import notFoundImage from '../assets/images/404.jpg';

export default function BookPage() {
  const [book, setBook] = useState(null);

  const [loading, setLoading] = useState(true);
  const [postingError, setPostingError] = useState(false);
  const [langsMeta, setLangsMeta] = useState([]);
  const [genresMeta, setGenresMeta] = useState({});

  const { id } = useParams();

  async function fetchData() {
    const { langsMeta, genresMeta } = await getMetadata();
    const book = await getBook(id);

    setLangsMeta(langsMeta);
    setGenresMeta(genresMeta);
    setBook(book);
  }

  useEffect(() => {
    fetchData().then(() => {
      setLoading(false)
    });
  }, []);

  const genres = book && clarify(book.genres.map(genre => genresMeta[genre]));
  const lang = book && langsMeta[book.lang];

  function submitReview(text, rating) {
    if(!(text.trim()) || !rating) return;

    setLoading(true);
    postReview(book._id, text, rating * 2)
      .then(({ status }) => {
        if(status === 400) setPostingError(true)
      })
      .then(() => fetchData())
      .then(() => setLoading(false))
  }

  const bookInfo = !book ? <NotFoundSign /> : (
    <div className="content-wrapper">
      <Card className="book-info">
        <Card.Img
          variant="top"
          src={fromSource(book.cover) || notFoundImage}
        />
        <Card.Body>
          <Card.Title style={{fontSize: '1.5rem'}}>
            {book.title}
          </Card.Title>
          <Card.Subtitle
            className="mb-2 text-muted"
          >
            {
              joinComponents(createLinks(book.authors, 'authors'))
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
                Мова оригіналу: { langsMeta[book.src_lang] }
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
          <Card.Subtitle>
            Переглянуто: {book.view_count}
          </Card.Subtitle>
          <div className="book-rating">
            <ReactStars size={36} half={true} edit={false} value={book.avg_rating / 2}/>
          </div>
          <hr/>
          <a href={`/reader?bookId=${book._id}`} target="_blank">
            <Button variant="primary" style={{width: '100%'}}>Читати онлайн</Button>
          </a>
          <a href={`/reader/files/${book._id}.zip`}>
            <Button variant="outline-primary" style={{width: '100%'}}>Завантажити</Button>
          </a>
        </Card.Body>
      </Card>
      <CommentSection reviews={book.reviews || []} submitReview={submitReview} error={postingError}/>
    </div>
  );

  return (
    <div className="book-page">
      <Container>
        <div className="content">
          {
            loading
              ? <Spinner />
              : bookInfo
          }
        </div>
      </Container>
    </div>
  );
}
