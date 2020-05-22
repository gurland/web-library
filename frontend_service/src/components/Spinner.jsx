import React from 'react';
import { Spinner as BootstrapSpinner } from 'react-bootstrap';

const Spinner = () => (
  <div style={{display: 'flex', justifyContent: 'center'}}>
    <BootstrapSpinner
      animation="border"
      variant="primary"
    />
  </div>
);

export default Spinner;
