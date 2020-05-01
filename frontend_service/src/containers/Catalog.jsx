import React, { useState } from 'react';

import { Form, Button, Accordion, Nav } from 'react-bootstrap';
import FiltersAccordion  from './FiltersAccordion';

import { getAuthors, getGenres, getLangs } from '../utils/api/mock';
import { getFullDate } from '../utils';

export default function Catalog() {
  const [authors, setAuthors] = useState(getAuthors());
  const [genres, setGenres] = useState(getGenres());
  const [langs, setLangs] = useState(getLangs());
  const [dates, setDates] = useState({
    start: getFullDate(),
    end: getFullDate(),
  });

  return (
    <div className="catalog">
      <Form className="search-form">
        <Form.Group>
          <Form.Control type="text" placeholder="Шукати за назвою..." />
          <Button type="submit">Пошук</Button>
        </Form.Group>
        <FiltersAccordion
          authors={{ authors, setAuthors }}
          genres={{ genres, setGenres }}
          langs={{ langs, setLangs }}
          dates={{ dates, setDates }}
        />
      </Form>
    </div>
  );
}
