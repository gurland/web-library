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
  const [selectedLang, setSelectedLang] = useState('');

  const [includeRating, setIncludeRating] = useState(false);

  const [submitted, setSubmitted] = useState(false);

  return submitted
    ? <Redirect
        push
        to={{
          pathname: '/results',
          search: buildUrl({
            queryParams: normalize({
              title: query,
              authors: selectedAuthors.length ? selectedAuthors : null,
              genres: selectedGenres.join(','),
              language: selectedLang,
              minRating: includeRating && ratings[0],
              maxRating: includeRating && ratings[1],
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
        selectedLang={{ selectedLang, setSelectedLang }}
        ratings={{ ratings, setRatings, includeRating, setIncludeRating }}
        selectedGenres={{ selectedGenres, setSelectedGenres }}
      />
    </Form>
  );
}
