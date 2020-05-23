import React, { useState, useContext } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';

import { Redirect } from 'react-router-dom';

import { ValidatableForm, ValidatableInput } from '../components';
import { authorize } from '../helpers';
import { Context } from '../App';

export default function RegPage() {
  const [authorized, setAuthorized] = useState(false);
  const ctx = useContext(Context);

  const {
    isSubmitting,
    handleSubmit,
    handleChange,
    handleBlur,
    touched,
    errors,
    values: {
      username,
      password,
      confirmPassword,
    },
  } = useFormik({
    initialValues: {
      username: '',
      password: '',
      confirmPassword: '',
    },
    validateOnChange: true,
    validateOnBlur: true,
    validationSchema: Yup.object().shape({
      username: Yup.string()
        .required('Будь ласка, введіть ім\'я користувача!'),
      password: Yup.string()
        .min(6, 'Пароль занадто короткий!')
        .max(30, 'Пароль занадто довгий!')
        .required('Будь ласка, введіть пароль!'),
      confirmPassword: Yup.string()
        .oneOf([Yup.ref('password'), null], 'Паролі не збігаються!')
        .required('Будь ласка, уведіть пароль ще раз!'),
    }),
    onSubmit: async (values) => {
      const { username, password } = values;
      await authorize(username, password);
      setAuthorized(true);

      ctx.setAuthorized(true);
    },
  });

  return authorized ? <Redirect to="/" /> : (
    <div className="registration-page">
      <ValidatableForm
        handleSubmit={handleSubmit}
        errors={errors}
        isSubmitting={isSubmitting}
        touched={touched}
        buttonText="Створити аккаунт"
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
        <ValidatableInput
          label="Підтвердження паролю"
          name="confirmPassword"
          type="password"
          placeholder="Уведіть пароль ще раз..."
          value={confirmPassword}
          onChange={handleChange}
          onBlur={handleBlur}
        />
      </ValidatableForm>
    </div>
  );
}
