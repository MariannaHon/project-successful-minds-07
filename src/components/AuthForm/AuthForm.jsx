import { useDispatch } from 'react-redux';
import { logIn } from '../../redux/auth/operations';
import css from './AuthForm.module.css';
import * as Yup from 'yup';
import { Field, Form, Formik, ErrorMessage } from 'formik';
import { useId } from 'react';


const AuthForm = () => {
  const dispatch = useDispatch();

  const login = Yup.object().shape({
    email: Yup.string()
      .email('Please enter a valid email address')
      .required('Required'),
    password: Yup.string()
      .min(4, 'Password must be at least 8 characters')
      .max(64, 'Password must be no more than 64 characters')
      .required('Required'),
  });

  const mailFieldId = useId();
  const passwordFieldId = useId();

  return (
    <Formik
      initialValues={{ email: '', password: '' }}
      validationSchema={login}
      onSubmit={(values, actions) => {
        const userData = {
          email: values.email,
          password: values.password,
        };
        console.log({ userData });

        dispatch(logIn(userData));
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
