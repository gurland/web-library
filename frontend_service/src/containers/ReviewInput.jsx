import React, { useState, useContext } from 'react';

import { Card, InputGroup, Form, Button } from 'react-bootstrap';
import ReactStars from 'react-stars';

import { Context } from '../App';

export default function ReviewInput({ onSubmit, error }) {
  const [rating, setRating] = useState(0);
  const [reviewText, setReviewText] = useState('');
  const ctx = useContext(Context);

  const button = ctx.authorized ? (
    <Button
      variant="primary"
      onClick={() => onSubmit(reviewText, rating)}
    >
      Надіслати
    </Button>
  ) : (
    <Button variant="primary" disabled>
      Увійдіть щоб надіслати
    </Button>
  );

  return (
    <Card body className="review-input">
      <InputGroup>
        <Form.Control
          as="textarea"
          rows={5}
          placeholder="Напишіть свій відгук..."
          onChange={(e) => setReviewText(e.target.value)}
          value={reviewText}
        />
      </InputGroup>
      <div className="controls-wrapper">
        {error && <Form.Text className="text-muted error review-error">На кожну книгу можна написати лише один відгук.</Form.Text>}
        <ReactStars half={true} size={36} value={rating} onChange={(newRating) => setRating(newRating)} />
        {button}
      </div>
    </Card>
  );
}