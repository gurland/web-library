import React, { useContext, useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Redirect } from 'react-router-dom';

import { ValidatableForm, ValidatableInput } from '../components';
import { authorize } from '../helpers';
import { Context } from '../App';

export default function LoginPage() {
  const [authorized, setAuthorized] = useState(false);
  const ctx = useContext(Context);

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
      const { username, password } = values;
      const status = await authorize('login', username, password);

      if (status === 400) {
        errors.serverError = 'Неправильне ім\'я користувача або пароль.';
        return;
      }

      setAuthorized(true);
      ctx.setAuthorized(true);
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
