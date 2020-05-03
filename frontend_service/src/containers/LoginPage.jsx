import React, { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';

import { Redirect } from 'react-router-dom';

import ValidatableForm from '../components/ValidatableForm';
import ValidatableInput from '../components/ValidatableInput';

export default function LoginPage() {
  const [authorized, setAuthorized] = useState(false);

  const {
    values: {
      username,
      password,
    },
    handleChange,
    handleBlur,
    handleSubmit,
    isSubmitting,
    errors,
    touched,
  } = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    validateOnBlur: true,
    validateOnChange: true,
    validationSchema: Yup.object().shape({
      username: Yup.string()
        .required('Будь ласка, введіть ім\'я користувача!'),
      password: Yup.string()
        .required('Будь ласка, введіть пароль!'),
    }),
    onSubmit: async (values) => {

    },
  });

  return authorized ? <Redirect to="/" /> : (
    <div className="login-page">
      <ValidatableForm
        handleSubmit={handleSubmit}
        errors={errors}
        isSubmitting={isSubmitting}
        touched={touched}
        buttonText="Увійти"
      >
        <ValidatableInput
          label="Ім'я користувача"
          name="username"
          type="text"
          placeholder="Уведіть ім'я користувача"
          value={username}
          onChange={handleChange}
          onBlur={handleBlur}
        />
        <ValidatableInput
          label="Пароль"
          name="password"
          type="password"
          placeholder="Уведіть пароль..."
          value={password}
          onChange={handleChange}
          onBlur={handleBlur}
        />
      </ValidatableForm>
    </div>
  );
}
