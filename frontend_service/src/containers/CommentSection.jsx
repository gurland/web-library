import React, { useState, useEffect } from 'react';

import { getReviews, postReview } from '../helpers';
import { Spinner, Review } from '../components';
import { Card } from 'react-bootstrap';

import ReviewInput from './ReviewInput';

export default function CommentSection({ bookId }) {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getReviews(bookId)
      .then(reviews => setReviews(reviews))
      .then(() => setLoading(false));
  }, [])

  function submitReview(text, rating) {
    setLoading(true);
    postReview(bookId, text, rating)
      .then(() => getReviews(bookId).then(reviews => setReviews(reviews)))
      .then(() => setLoading(false));
  }

  const reviewComponents = reviews.map(review => <Review review={review}/>);

  return (
    <>
      <Card body className="comment-section">
        {
          loading ? <Spinner /> : reviewComponents
        }
      </Card>
      <ReviewInput onSubmit={submitReview}/>
    </>
  );
}