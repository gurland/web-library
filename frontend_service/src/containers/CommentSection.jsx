import React, { useState, useEffect } from 'react';

import { getReviews, postReview } from '../helpers';
import { Spinner, Review } from '../components';
import { Card } from 'react-bootstrap';

import ReviewInput from './ReviewInput';

export default function CommentSection({ reviews, submitReview }) {
  const reviewComponents = reviews.map((review, idx) => <Review review={review} key={idx}/>);

  return (
    <>
      <Card body className="comment-section">
        {
          reviewComponents
        }
      </Card>
      <ReviewInput onSubmit={submitReview}/>
    </>
  );
}