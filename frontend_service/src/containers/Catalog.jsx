import React from 'react';

import { Form, Button } from 'react-bootstrap';

export default function Catalog() {
  return (
    <div className="catalog">
      <Form className="search-form">
        <Form.Group>
          <Form.Control type="text" placeholder="Enter title..." />
          <Button>Search</Button>
        </Form.Group>
      </Form>
    </div>
  );
}
