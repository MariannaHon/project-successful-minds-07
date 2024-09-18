import { Formik, Form, Field, ErrorMessage } from 'formik';
import { useDispatch } from 'react-redux';
import * as Yup from 'yup';
import { register } from '../../redux/auth/operations';
import css from './RegisterForm.module.css';
import { FaRegEye, FaRegEyeSlash } from 'react-icons/fa6';
import { useId, useState } from 'react';
import { Link } from 'react-router-dom';

const RegisterForm = () => {
  const [isOpen, setIsOpen] = useState(true);
  const [type, setType] = useState('password');

  const dispatch = useDispatch();

  const onSubmit = (values, actions) => {
    const newUser = {
      email: values.email,
      password: values.password,
    };
    dispatch(register(newUser));
    actions.resetForm();
  };

  const formSchema = Yup.object().shape({
    email: Yup.string()
      .email('Please enter a valid email address')
      .required('Email is Required'),
    password: Yup.string()
      .min(8, 'Password must be at least 8 characters')
      .max(64, 'Password must be no more than 64 characters')
      .required('Password is Required'),
    repeatPassword: Yup.string()
      .oneOf([Yup.ref('password'), null], 'Passwords must match')
      .required('Repeat Password is Required'),
  });

  const togglePassInput = () => {
    setType(isOpen ? 'text' : 'password');
    setIsOpen(!isOpen);
  };

  const id = useId();

  return (
    <div className={css.registerWrapper}>
      <div className={css.registerContainer}>
        <div className={css.background}></div>
        <div className={css.formBoxPosition}>
          <p className={css.description}>Sign Up</p>
          <Formik
            initialValues={{ email: '', password: '', repeatPassword: '' }}
            onSubmit={onSubmit}
            validationSchema={formSchema}
          >
            {({ errors, touched }) => (
              <Form className={css.form} noValidate>
                <div className={css.formContainer}>
                  <label className={css.label} htmlFor="email">
                    Enter your email
                  </label>
                  <div>
                    <Field
                      className={`${css.input} ${errors.email && touched.email
                          ? errors.email === 'Email is Required'
                            ? css.required
                            : css.invalid
                          : touched.email && !errors.email
                            ? css.valid
                            : ''
                        }`}
                      id={`${id}-email`}
                      type="email"
                      name="email"
                      autoComplete="off"
                      placeholder="E-mail"
                    />
                  </div>
                  <ErrorMessage
                    name="email"
                    component="span"
                    className={css.error}
                  />
                </div>

                <div className={css.formContainer}>
                  <label className={css.label} htmlFor="password">
                    Enter your password
                  </label>
                  <div className={css.iconPosition}>
                    <Field
                      id={`${id}-password`}
                      className={`${css.input} ${errors.password && touched.password
                          ? errors.password ===
                            'Password must be at least 8 characters'
                            ? css.short
                            : errors.password ===
                              'Password must be no more than 64 characters'
                              ? css.long
                              : errors.password === 'Password is Required'
                                ? css.required
                                : css.invalid
                          : touched.password && !errors.password
                            ? css.valid
                            : ''
                        }`}
                      type={type}
                      name="password"
                      autoComplete="new-password"
                      placeholder="Password"
                    />

                    {isOpen ? (
                      <FaRegEyeSlash
                        name="password"
                        id={`${id}-password`}
                        className={css.passEye}
                        onClick={togglePassInput}
                      />
                    ) : (
                      <FaRegEye
                        name="password"
                        id={`${id}-password`}
                        className={css.passEye}
                        onClick={togglePassInput}
                      />
                    )}
                  </div>

                  <ErrorMessage
                    name="password"
                    component="span"
                    className={css.error}
                  />
                </div>
                <div className={css.formContainer}>
                  <label className={css.label} htmlFor="repeatPassword">
                    Repeat password
                  </label>
                  <div className={css.iconPosition}>
                    <Field
                      id={`${id}-repeatPassword`}
                      className={`${css.input} ${errors.repeatPassword && touched.repeatPassword
                          ? css.mismatch
                          : touched.repeatPassword && !errors.repeatPassword
                            ? css.valid
                            : ''
                        }`}
                      type={isOpen ? 'password' : 'text'}
                      name="repeatPassword"
                      autoComplete="new-password"
                      placeholder="Repeat password"
                    />

                    {isOpen ? (
                      <FaRegEyeSlash
                        name="repeatPassword"
                        id={`${id}-repeatPassword`}
                        className={css.repPassEye}
                        onClick={togglePassInput}
                      />
                    ) : (
                      <FaRegEye
                        name="repeatPassword"
                        id={`${id}-repeatPassword`}
                        className={css.repPassEye}
                        onClick={togglePassInput}
                      />
                    )}
                  </div>
                  <ErrorMessage
                    name="repeatPassword"
                    component="span"
                    className={css.error}
                  />
                </div>
                <button className={css.button} type="submit">
                  Sign Up
                </button>
              </Form>
            )}
          </Formik>
          <div className={css.image} alt="BottleLogo">
            <Link className={css.link} to="/signin">
              Sign in
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterForm;
