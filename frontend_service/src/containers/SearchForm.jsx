import React, { useEffect, useState } from 'react';

import { Button, Form } from 'react-bootstrap';

import FiltersAccordion from './FiltersAccordion';
import { getGenres, formatGenres } from '../helpers/';

export default function SearchForm() {
  const [query, setQuery] = useState('');
  const [ratings, setRatings] = useState([1.0, 10.0]);
  const [selectedGenres, setSelectedGenres] = useState([]);
  const [selectedAuthors, setSelectedAuthors] = useState([]);
  const [selectedLangs, setSelectedLangs] = useState([]);

  return (
    <Form className="search-form">
      <Form.Group>
        <Form.Control
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Шукати за назвою..."
        />
        {/*
        // setState found true -> redirect to /results with state: { ...found_data }
        <Redirect
          to={{
            pathname: "/login",
            search: "?utm=your+face",
            state: { referrer: currentLocation }
          }}
        />
        */}
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
