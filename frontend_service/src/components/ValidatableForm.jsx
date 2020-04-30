import React from 'react';
import PropTypes from 'prop-types';

import { Form, Container, Button } from 'react-bootstrap';

export default function ValidatableForm({
  handleSubmit,
  errors,
  touched,
  isSubmitting,
  buttonText,
  ...rest
}) {
  return (
    <Container>
      <Form onSubmit={handleSubmit}>
        {
          rest.children.map((child, idx) => React.cloneElement(child, {
            errors,
            touched,
            // eslint-disable-next-line react/no-array-index-key
            key: idx,
            disabled: isSubmitting,
          }))
        }
        <Button
          variant="primary"
          type="submit"
          disabled={isSubmitting}
        >
          {buttonText}
        </Button>
        {
          // eslint-disable-next-line react/prop-types
          errors.serverError && (
            <Form.Text className="text-muted error">
              {/* eslint-disable-next-line react/prop-types */}
              {errors.serverError}
            </Form.Text>
          )
        }
      </Form>
    </Container>
  );
}

ValidatableForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  errors: PropTypes.shape({}).isRequired,
  touched: PropTypes.shape({}).isRequired,
  isSubmitting: PropTypes.bool.isRequired,
  buttonText: PropTypes.string.isRequired,
};
