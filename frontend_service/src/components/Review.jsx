import React from 'react';

import { Card } from 'react-bootstrap';
import ReactStars from 'react-stars'

import { getFullDate } from '../helpers';

export default function Review({ review }) {
  return (
    <Card className="review">
      <div style={{display: 'flex', flexDirection: 'row'}}>
        <Card.Title>
          {review.author}
        </Card.Title>
        <span style={{marginLeft: '0.5rem'}}>({getFullDate(new Date(review.date))})</span>
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
