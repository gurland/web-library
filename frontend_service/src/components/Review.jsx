import React from 'react';

import { Card } from 'react-bootstrap';
import ReactStars from 'react-stars'

export default function Review({ review }) {
  return (
    <Card className="review">
      <Card.Title>
        {review.author}
      </Card.Title>
      <Card.Subtitle>
        <ReactStars
          value={review.rating}
          half={true}
          edit={false}
        />
      </Card.Subtitle>
      <Card.Text>
        {review.text}
      </Card.Text>
    </Card>
  );
}
