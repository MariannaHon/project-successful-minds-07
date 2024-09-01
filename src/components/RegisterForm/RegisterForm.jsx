import { Formik, Form, Field } from 'formik';
import { useDispatch } from 'react-redux';
import * as Yup from 'yup';
import { ErrorMessage } from 'formik';
import { register } from '../../redux/auth/operations';
import toast from 'react-hot-toast';
import css from './RegisterForm.module.css';

const RegisterForm = () => {
  const dispatch = useDispatch();

  const onSubmit = (values, actions) => {
    if (values.password === values.repeatPassword) {
      dispatch(register(values));
      actions.resetForm();
    } else {
      {
        toast.error('Passwords did not happen', {
          position: 'top-right',
        });
      }
    }
  };

  const formSchema = Yup.object().shape({
    email: Yup.string().email().required(),
    password: Yup.string()
      .min(8, 'Too short password')
      .max(64, 'Too long password')
      .required(),
  });

  return (
    <div className={css.registerContainer}>
      <div className={css.registerHeader}>
        <p>Tracker of water</p>
        <a href="/signin">Sign in</a>
      </div>
      <Formik
        initialValues={{ email: '', password: '', repeatPassword: '' }}
        onSubmit={onSubmit}
        validationSchema={formSchema}
      >
        <Form className={css.form}>
          <p>Sign Up</p>
          <Field
            className={css.input}
            type="email"
            name="email"
            autoComplete="off"
            placeholder="E-mail"
          ></Field>
          <ErrorMessage className={css.warning} name="email" component="span" />

          <Field
            className={css.input}
            type="password"
            name="password"
            autoComplete="new-password"
            placeholder="Password"
          ></Field>
          <ErrorMessage
            className={css.warning}
            name="password"
            component="span"
          />

          <Field
            className={css.input}
            type="password"
            name="repeatPassword"
            autoComplete="new-password"
            placeholder="Repeat password"
          ></Field>

          <button className={css.button} type="submit">
            Sign Up
          </button>

          <a href="/signin">Sign in</a>
        </Form>
      </Formik>
      <img
        className={css.image}
        src="../../../public/images/BottleRegisterMobile.jpg"
        alt="BottleLogo"
      />
    </div>
  );
};

export default RegisterForm;
