import React, { useState } from 'react';

import { Button, Form } from 'react-bootstrap';

import FiltersAccordion from './FiltersAccordion';
import { getAuthors, getGenres, getLangs } from '../utils/api/mock';

export default function SearchForm() {
  const [authors, setAuthors] = useState(getAuthors());
  const [genres, setGenres] = useState(getGenres());
  const [langs, setLangs] = useState(getLangs());
  const [ratings, setRatings] = useState([0, 10]);

  return (
    <Form className="search-form">
      <Form.Group>
        <Form.Control type="text" placeholder="Шукати за назвою..." />
        <Button type="submit">Пошук</Button>
      </Form.Group>
      <FiltersAccordion
        authors={{ authors, setAuthors }}
        genres={{ genres, setGenres }}
        langs={{ langs, setLangs }}
        ratings={{ ratings, setRatings }}
      />
    </Form>
  );
}
