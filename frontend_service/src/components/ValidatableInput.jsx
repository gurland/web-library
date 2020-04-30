import React from 'react';
import PropTypes from 'prop-types';
import Form from 'react-bootstrap/Form';

export default function ValidatableInput({
  label,
  name,
  type,
  placeholder,
  value,
  onChange,
  onBlur,
  disabled,
  errors,
  touched,
}) {
  return (
    <Form.Group>
      <Form.Label>{label}</Form.Label>
      <Form.Control
        name={name}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        disabled={disabled}
        errors={errors}
        touched={touched}
      />
      {
        errors[name] && touched[name] && (
          <Form.Text className="text-muted error">
            {errors[name]}
          </Form.Text>
        )
      }
    </Form.Group>
  );
}

ValidatableInput.propTypes = {
  label: PropTypes.string,
  name: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  onBlur: PropTypes.func.isRequired,
  disabled: PropTypes.bool,
  touched: PropTypes.shape({}),
  errors: PropTypes.shape({}),
};

ValidatableInput.defaultProps = {
  label: '',
  errors: {},
  touched: {},
  disabled: false,
};
