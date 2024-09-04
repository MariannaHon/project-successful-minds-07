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

  return (
    <div className={css.registerContainer}>
      {/* <div className={css.registerHeader}>
        <div>
          <svg className={css.waterIcon}>
            <use href="../../../public/symbol-defs.svg#"></use>
          </svg>
          <h2 className={css.title}>Tracker of water</h2>
        </div>
      </div> */}
      <p className={css.description}>Sign Up</p>
      <Formik
        initialValues={{ email: '', password: '', repeatPassword: '' }}
        onSubmit={onSubmit}
        validationSchema={formSchema}
      >
        <Form className={css.form}>
          <label className={css.label} htmlFor="email">
            Enter your email
          </label>
          <Field
            className={css.input}
            id="email"
            type="email"
            name="email"
            autoComplete="off"
            placeholder="E-mail"
          ></Field>
          <ErrorMessage className={css.warning} name="email" component="span" />
          <label className={css.label} htmlFor="password">
            Enter your password
          </label>
          <Field
            id="password"
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
          <label className={css.label} htmlFor="repeatPassword">
            Repeat password
          </label>
          <Field
            id="repeatPassword"
            className={css.input}
            type="password"
            name="repeatPassword"
            autoComplete="new-password"
            placeholder="Repeat password"
          ></Field>

          <button className={css.button} type="submit">
            Sign Up
          </button>
        </Form>
      </Formik>
      <div className={css.image} alt="BottleLogo">
        <a className={css.link} href="/signin">
          Sign in
        </a>
      </div>
    </div>
  );
};

export default RegisterForm;
