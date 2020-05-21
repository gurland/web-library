import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import { Accordion, Button, Card, Form } from 'react-bootstrap';
import { Dropdown } from 'semantic-ui-react';
import Range from 'rc-slider/lib/Range';
import 'rc-slider/assets/index.css';

import { formatGenres, formatLangs, getGenres, getLangs, getAuthors } from '../helpers';

export default function FiltersAccordion(props) {
  const [authors, setAuthors] = useState([]);
  const [genres, setGenres] = useState([]);
  const [langs, setLangs] = useState([]);

  useEffect(() => {
    getGenres().then(genres => setGenres(formatGenres(genres)));
    getLangs().then(langs => setLangs(formatLangs(langs)));
    // getAuthors().then(genres => setGenres(formatGenres(genres)));
  }, []);

  const {
    selectedAuthors: {
      selectedAuthors, setSelectedAuthors
    },
    selectedGenres: {
      selectedGenres, setSelectedGenres
    },
    selectedLang: {
      selectedLang, setSelectedLang
    },
    ratings: {
      ratings, setRatings
    }
  } = props;

  const handleRatingChange = ([start, end]) => {
    setRatings([
      parseFloat(start.toFixed(1)),
      parseFloat(end.toFixed(1)),
    ]);
  };

  return (
    <Accordion>
      <Accordion.Toggle
        as={Button}
        variant="link"
        eventKey="0"
        className="toggle-btn"
      >
        Додаткові параметри пошуку
      </Accordion.Toggle>
      <Accordion.Collapse eventKey="0">
        <div className="filters">
          <Card className="column-1">
            <Card.Body>
              <Dropdown
                placeholder='Автори'
                fluid
                multiple
                search
                selection
                options={authors}
                onChange={(event, data) => setSelectedAuthors(data.value)}
                value={selectedAuthors}
              />
              <Dropdown
                placeholder='Жанри'
                fluid
                multiple
                search
                selection
                options={genres}
                onChange={(event, data) => {
                  if(data.value.length <= 5) setSelectedGenres(data.value);
                }}
                value={selectedGenres}
              />
              <Dropdown
                placeholder='Мови'
                fluid
                search
                selection
                options={langs}
                onChange={(event, data) => setSelectedLang(data.value)}
                value={selectedLang}
              />
            </Card.Body>
          </Card>
          <Card className="column-2">
            <Card.Body>
              <Card.Title>Пошук за рейтингом</Card.Title>
              <Form.Group>
                <Form.Control value={ratings[0]}/>
                <Form.Control value={ratings[1]}/>
                <Range
                  min={1.0}
                  max={10.0}
                  defaultValue={ratings}
                  step={0.1}
                  pushable={0.1}
                  onChange={handleRatingChange}
                />
              </Form.Group>
            </Card.Body>
          </Card>
        </div>
      </Accordion.Collapse>
    </Accordion>
  );
}

FiltersAccordion.propTypes = {
  selectedAuthors: PropTypes.shape({
    selectedAuthors: PropTypes.arrayOf(PropTypes.string).isRequired,
    setSelectedAuthors: PropTypes.func.isRequired,
  }).isRequired,
  selectedGenres: PropTypes.shape({
    selectedGenres: PropTypes.arrayOf(PropTypes.string).isRequired,
    setSelectedGenres: PropTypes.func.isRequired,
  }).isRequired,
  selectedLang: PropTypes.shape({
    selectedLang: PropTypes.string.isRequired,
    setSelectedLang: PropTypes.func.isRequired,
  }).isRequired,
  ratings: PropTypes.shape({
    ratings: PropTypes.arrayOf(PropTypes.number).isRequired,
    setRatings: PropTypes.func.isRequired,
  }).isRequired,
};
