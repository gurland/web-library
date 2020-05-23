import React, { useState } from 'react';

import { Card, InputGroup, Form, Button } from 'react-bootstrap';
import ReactStars from 'react-stars';

export default function ReviewInput({ onSubmit }) {
  const [rating, setRating] = useState(0);
  const [reviewText, setReviewText] = useState('');

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
        <ReactStars half={true} size={36} value={rating} onChange={(newRating) => setRating(newRating)} />
        <Button
          variant="primary"
          onClick={() => onSubmit(reviewText, rating)}
        >
          Відправити
        </Button>
      </div>
    </Card>
  );
}