import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import { Accordion, Button, Card, Form } from 'react-bootstrap';
import { SearchDropdown } from '../components';

import Range from 'rc-slider/lib/Range';
import 'rc-slider/assets/index.css';

import { formatGenres, formatLangs, formatAuthors, getGenres, getLangs, getAuthors } from '../helpers';

export default function FiltersAccordion(props) {
  const [authors, setAuthors] = useState([]);
  const [genres, setGenres] = useState([]);
  const [langs, setLangs] = useState([]);

  useEffect(() => {
    getGenres().then(genres => setGenres(formatGenres(genres)));
    getLangs().then(langs => setLangs(formatLangs(langs)));

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
      ratings, setRatings, includeRating, setIncludeRating
    }
  } = props;

  let timeoutId;

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
              <SearchDropdown
                placeholder='Автори'
                multiple={true}
                options={authors}
                onChange={(event, data) => setSelectedAuthors(data.value)}
                additionalProps={{
                  onSearchChange: (event, data) => {
                    if(!data.searchQuery) {
                      setAuthors([]);
                    } else {
                      clearTimeout(timeoutId);
                      timeoutId = setTimeout(() => {
                        getAuthors(data.searchQuery).then(authors => setAuthors(formatAuthors(authors)));
                      }, 250)
                    }
                  }
                }}
                value={selectedAuthors}
              />
              <SearchDropdown
                placeholder='Жанри'
                multiple={true}
                options={genres}
                onChange={(event, data) => {
                  if(data.value.length <= 5) setSelectedGenres(data.value);
                }}
                value={selectedGenres}
              />
              <SearchDropdown
                placeholder='Мови'
                options={langs}
                onChange={(event, data) => setSelectedLang(data.value)}
                value={selectedLang}
              />
            </Card.Body>
          </Card>
          <Card className="column-2">
            <Card.Body>
              <Card.Title>
                Пошук за рейтингом
                <input type="checkbox"
                       checked={includeRating}
                       onChange={() => {
                         setIncludeRating(!includeRating);
                       }}
                       style={{marginLeft: '0.5rem'}}
                />
              </Card.Title>
              <Form.Group>
                <Form.Control value={ratings[0]} disabled={!includeRating}/>
                <Form.Control value={ratings[1]} disabled={!includeRating}/>
                <Range
                  min={1.0}
                  max={10.0}
                  defaultValue={ratings}
                  step={0.1}
                  pushable={0.1}
                  onChange={handleRatingChange}
                  disabled={!includeRating}
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
