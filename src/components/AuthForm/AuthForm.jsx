import { useDispatch } from 'react-redux';
import { logIn } from '../../redux/auth/operations';
import css from './AuthForm.module.css';
import * as Yup from 'yup';
import { Field, Form, Formik, ErrorMessage } from 'formik';
import { useState, useId } from 'react';
import { FaRegEye } from 'react-icons/fa6';
import { FaRegEyeSlash } from 'react-icons/fa6';
import { Toaster } from 'react-hot-toast';

const AuthForm = () => {
  const [type, setType] = useState('password');
  const [openPsw, setOpenPsw] = useState(true);
  const dispatch = useDispatch();
  const onSubmit = (values, actions) => {
    const userData = {
      email: values.email,
      password: values.password,
    };
    dispatch(logIn(userData)).unwrap();
    actions.resetForm();
  };
  // const [password, setPassword] = useState('');
  // const maskedPassword = password.replace(/./g, '*');
  // const handleChange = (event) => {
  //   setPassword(event.target.value);
  // };

  const login = Yup.object().shape({
    email: Yup.string()
      .email('Please enter a valid email address')
      .required('Email is Required'),
    password: Yup.string()
      .min(8, 'Password must be at least 8 characters')
      .max(64, 'Password must be no more than 64 characters')
      .required('Password is Required'),
  });

  const mailFieldId = useId();
  const passwordFieldId = useId();
  const togglePassInput = () => {
    if (type === 'password') {
      setType('text');
      setOpenPsw(false);
    } else {
      setType('password');
      setOpenPsw(true);
    }
  };

  return (
    <>
      <Toaster />
      <Formik
        initialValues={{ email: '', password: '' }}
        validationSchema={login}
        onSubmit={onSubmit}
      > {({ errors, touched }) => (
        <Form className={css.formContainer} name="Sign In" noValidate>
          <label htmlFor={mailFieldId} className={css.label}>
            Enter your email
          </label>
          <div className={css.wrap}>
            <Field
              type="email"
              name="email"
              // autoComplete="off"
              id={mailFieldId}
              className={
                errors.email && touched.email
                  ? `${css.inputField} ${css.inputError}` // Добавляем класс ошибки
                  : css.inputField
              }
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
          <div className={css.wrap_pswd}>
            <Field
              type={type}
              name="password"
              // value={password}
              // onChange={handleChange}
              // // autoComplete="off"
              id={passwordFieldId}
              // className={css.inputField_pswd}
              className={
                errors.email && touched.email
                  ? `${css.inputField_pswd} ${css.inputError}` // Добавляем класс ошибки
                  : css.inputField_pswd
              }
              placeholder="Password"
            />
            <ErrorMessage
              name="password"
              component="span"
              className={css.errorMessage}
            />
            <span>
              {openPsw ? (
                <FaRegEyeSlash
                  name="password"
                  id={`${passwordFieldId}-password`}
                  className={css.eye}
                  onClick={togglePassInput}
                />
              ) : (
                <FaRegEye
                  name="outPassword"
                  id={`${passwordFieldId}-password`}
                  className={css.eye}
                  onClick={togglePassInput}
                />
              )}
            </span>
            {/* <span className={css.stars}>{maskedPassword}</span> */}
          </div>

          <button type="submit" className={css.submitButton}>
            Sign In
          </button>
        </Form>
      )}
      </Formik>
    </>
  );
};

export default AuthForm;
