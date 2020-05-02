import React, { useState } from 'react';
import PropTypes from 'prop-types';

import { Accordion, Button, Card, Form } from 'react-bootstrap';
import { Dropdown } from 'semantic-ui-react';
import Range from 'rc-slider/lib/Range';
import 'rc-slider/assets/index.css';

export default function FiltersAccordion(props) {
  const {
    authors: {
      authors, setAuthors
    },
    genres: {
      genres, setGenres
    },
    langs: {
      langs, setLangs
    },
    ratings: {
      ratings, setRatings
    }
  } = props;

  const handleRatingChange = ([start, end]) => {
    setRatings([
      start.toFixed(1),
      end.toFixed(1),
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
              />
              <Dropdown
                placeholder='Жанри'
                fluid
                multiple
                search
                selection
                options={genres}
              />
              <Dropdown
                placeholder='Мови'
                fluid
                multiple
                search
                selection
                options={langs}
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
                  min={0.0}
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
  authors: PropTypes.shape({
    authors: PropTypes.arrayOf(PropTypes.string).isRequired,
    setAuthors: PropTypes.func.isRequired,
  }).isRequired,
  genres: PropTypes.shape({
    genres: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
    setGenres: PropTypes.func.isRequired,
  }).isRequired,
  langs: PropTypes.shape({
    langs: PropTypes.arrayOf(PropTypes.string).isRequired,
    setLangs: PropTypes.func.isRequired,
  }).isRequired,
  ratings: PropTypes.shape({
    ratings: PropTypes.arrayOf(PropTypes.number).isRequired,
    setRatings: PropTypes.func.isRequired,
  }).isRequired,
};
