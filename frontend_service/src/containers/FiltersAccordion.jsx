import React, { useState } from 'react';

import { Accordion, Button } from 'react-bootstrap';
import { Filters } from '../components';

export default function FiltersAccordion({ authors, genres, langs, dates }) {
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
        <Filters
          authors={authors}
          genres={genres}
          langs={langs}
          dates={dates}
        />
      </Accordion.Collapse>
    </Accordion>
  );
}
