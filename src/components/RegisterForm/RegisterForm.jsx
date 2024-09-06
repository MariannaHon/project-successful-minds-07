import { Formik, Form, Field } from 'formik';
import { useDispatch } from 'react-redux';
import * as Yup from 'yup';
import { ErrorMessage } from 'formik';
import { register } from '../../redux/auth/operations';
import toast from 'react-hot-toast';
import css from './RegisterForm.module.css';
import { FaRegEye } from 'react-icons/fa6';
import { FaRegEyeSlash } from 'react-icons/fa6';
import { useId, useState } from 'react';
import { NavLink } from 'react-router-dom';

const RegisterForm = () => {
  const [isOpen, setIsOpen] = useState(true);
  const [type, setType] = useState('password');

  const dispatch = useDispatch();

  const onSubmit = (values, actions) => {
    const newUser = {
      email: values.email,
      password: values.password,
    };

    if (values.password === values.repeatPassword) {
      dispatch(register(newUser));
      actions.resetForm();
    } else {
      toast.error('Passwords did not happen', {
        position: 'top-right',
      });
    }
  };

  const formSchema = Yup.object().shape({
    email: Yup.string().email().required(),
    password: Yup.string()
      .min(8, 'Too short password')
      .max(64, 'Too long password')
      .required(),
  });

  const togglePassInput = () => {
    if (type === 'password') {
      setType('text');
      setIsOpen(false);
    } else {
      setType('password');
      setIsOpen(true);
    }
  };

  const id = useId();

  return (
    <div className={css.registerContainer}>
      <div className={css.background}></div>
      <p className={css.description}>Sign Up</p>
      <Formik
        initialValues={{ email: '', password: '', repeatPassword: '' }}
        onSubmit={onSubmit}
        validationSchema={formSchema}
      >
        <Form className={css.form}>
          <div className={css.formContainer}>
            <label className={css.label} htmlFor="email">
              Enter your email
            </label>
            <Field
              className={css.input}
              id={`${id}-email`}
              type="email"
              name="email"
              autoComplete="off"
              placeholder="E-mail"
            />
            {/* <ErrorMessage name="email" component="span" className="error" /> */}
          </div>
          <div className={css.formContainer}>
            <label className={css.label} htmlFor="password">
              Enter your password
            </label>
            <Field
              id={`${id}-password`}
              className={css.input}
              type="password"
              name="password"
              autoComplete="new-password"
              placeholder="Password"
            />
            {isOpen ? (
              <FaRegEyeSlash
                name="repeatPassword"
                id={`${id}-repeatPassword`}
                className={css.passEye}
                onClick={togglePassInput}
              />
            ) : (
              <FaRegEye
                name="repeatPassword"
                id={`${id}-repeatPassword`}
                className={css.passEye}
                onClick={togglePassInput}
              />
            )}
          </div>
          <div className={css.formContainer}>
            <label className={css.label} htmlFor="repeatPassword">
              Repeat password
            </label>
            <Field
              id={`${id}-repeatPassword`}
              className={css.input}
              type="password"
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
          <button className={css.button} type="submit">
            Sign Up
          </button>
        </Form>
      </Formik>
      <div className={css.image} alt="BottleLogo">
        <NavLink className={css.link} to="/signin">
          Sign in
        </NavLink>
      </div>
    </div>
  );
};

export default RegisterForm;
