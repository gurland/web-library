import React, { useState } from 'react';

import { Button, Form } from 'react-bootstrap';
import FiltersAccordion from './FiltersAccordion';
import { Redirect } from 'react-router-dom';

import { normalize } from '../helpers';
import buildUrl from 'build-url';

export default function SearchForm() {
  const [query, setQuery] = useState('');
  const [ratings, setRatings] = useState([1.0, 10.0]);
  const [selectedGenres, setSelectedGenres] = useState([]);
  const [selectedAuthors, setSelectedAuthors] = useState([]);
  const [selectedLangs, setSelectedLangs] = useState('');

  const [submitted, setSubmitted] = useState(false);

  return submitted
    ? <Redirect
        push
        to={{
          pathname: '/results',
          search: buildUrl({
            queryParams: normalize({
              title: query,
              authors: selectedAuthors,
              genres: selectedGenres.join(','),
              language: selectedLangs,
              minRating: ratings[0],
              maxRating: ratings[1],
            })
          }),
        }}
    />
    : (
    <Form className="search-form" onSubmit={(e) => {
      e.preventDefault();
      setSubmitted(true)
    }}>
      <Form.Group>
        <Form.Control
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Шукати за назвою..."
        />
        <Button type="submit">Пошук</Button>
      </Form.Group>
      <FiltersAccordion
        selectedAuthors={{ selectedAuthors, setSelectedAuthors }}
        selectedLangs={{ selectedLangs, setSelectedLangs }}
        ratings={{ ratings, setRatings }}
        selectedGenres={{ selectedGenres, setSelectedGenres }}
      />
    </Form>
  );
}
