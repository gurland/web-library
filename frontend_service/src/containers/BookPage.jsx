import React from 'react';
import { useParams } from 'react-router-dom';
import { Container, Spinner } from 'react-bootstrap';

export default function BookPage() {
  const { id } = useParams();

  return (
    <div className="book-page">
      <Container>
        <div className="content">
          {id}
        </div>
      </Container>
    </div>
  );
}