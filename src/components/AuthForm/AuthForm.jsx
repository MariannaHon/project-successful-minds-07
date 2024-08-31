import { useDispatch } from 'react-redux';
import { SignIn } from '../../redux/auth/operations';
import css from './AuthForm.module.css';

import { Field, Form, Formik, ErrorMessage } from 'formik';
import { useId } from 'react';
import { signin } from '../../validation';

const AuthForm = () => {
  console.log('-------------AUTHFORM');

  //   const dispatch = useDispatch();

  const mailFieldId = useId();
  const passwordFieldId = useId();

  return (
    <Formik
      initialValues={{ email: '', password: '' }}
      validationSchema={signin}
      onSubmit={(values, actions) => {
        const userData = {
          email: values.email,
          password: values.password,
        };
        //   dispatch(SignIn(userData));
        actions.resetForm();
      }}
    >
      <Form className={css.formContainer} name="Sign In">
        <label htmlFor={mailFieldId} className={css.label}>
          Enter your email
        </label>
        <div className={css.wrap}>
          <Field
            type="email"
            name="email"
            id={mailFieldId}
            className={css.inputField}
            placeholder="Email"
          />
          <ErrorMessage
            name="email"
            component="span"
            className={css.errorMessage}
          />
        </div>

        <label htmlFor={passwordFieldId} className={css.label}>
          Enter your password
        </label>
        <div className={css.wrap}>
          <Field
            type="password"
            name="password"
            id={passwordFieldId}
            className={css.inputField}
            placeholder="Password"
          />
          <ErrorMessage
            name="password"
            component="span"
            className={css.errorMessage}
          />
        </div>

        <button type="submit" className={css.submitButton}>
          Sign In
        </button>
      </Form>
    </Formik>
  );
};

export default AuthForm;
