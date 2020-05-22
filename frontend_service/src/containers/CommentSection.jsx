import React, { useState, useEffect } from 'react';

import { getReviews } from '../helpers';
import { Spinner, Review } from '../components';
import { Card } from 'react-bootstrap';

export default function CommentSection({ bookId }) {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    getReviews(bookId).then(reviews => setReviews(reviews));
  })

  const reviewComponents = reviews.map(review => <Review review={review}/>);

  return (
    <Card body className="comment-section">
      {
        !reviews.length ? <Spinner /> : reviewComponents
      }
    </Card>
  );
}