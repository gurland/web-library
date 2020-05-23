import React from 'react';

import { Card } from 'react-bootstrap';
import ReactStars from 'react-stars'

import { getFullDate } from '../helpers';

export default function Review({ review }) {
  return (
    <Card className="review">
      <div className="title-wrapper">
        <Card.Title>
          {review.author}
        </Card.Title>
        <span>({getFullDate(new Date(review.date))})</span>
      </div>

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
