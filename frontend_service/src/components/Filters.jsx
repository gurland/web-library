import React from 'react';
import PropTypes from 'prop-types';

import { Dropdown } from 'semantic-ui-react';
import { Card, Form } from 'react-bootstrap';

export default function Filters(props) {
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
    dates: {
      dates: datesValues, setDates
    }
  } = props;

  const handleDateChange = (start, end) => {
    setDates({
      start,
      end,
    });
  };

  return (
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
          <Card.Title>Пошук за датою публікації</Card.Title>
          <Form.Group>
            <Form.Control
              type="date"
              value={datesValues.start}
              onChange={(e) => handleDateChange(e.target.value, datesValues.end)}
            />
            <Form.Control
              type="date"
              value={datesValues.end}
              onChange={(e) => handleDateChange(datesValues.start, e.target.value)}
            />
          </Form.Group>
        </Card.Body>
      </Card>
    </div>
  )
}

Filters.propTypes = {};
