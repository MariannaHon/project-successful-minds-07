import { Formik, Form, Field } from 'formik';
import { useDispatch } from 'react-redux';
import * as Yup from 'yup';
import { ErrorMessage } from 'formik';
import { register } from '../../redux/auth/operations';

const RegisterForm = () => {
  const dispatch = useDispatch();

  const onSubmit = values => {
    dispatch(register(values));
  };

  const formSchema = Yup.object().shape({
    email: Yup.string().email().required(),
    password: Yup.string()
      .min(8, 'Too short password')
      .max(64, 'Too long password')
      .required(),
  });

  return (
    <div>
      <Formik
        initialValues={{ email: '', password: '', repeatPassword: '' }}
        onSubmit={(values, actions) => {
          if (values.password === values.repeatPassword) {
            console.log(values);
            actions.resetForm();
          } else {
            ('Passwords did not happen');
          }
        }}
        validationSchema={formSchema}
      >
        <Form>
          <Field type="email" name="email"></Field>
          <ErrorMessage name="email" component="span" />

          <Field
            type="password"
            name="password"
            autoComplete="new-password"
          ></Field>
          <ErrorMessage name="password" component="span" />

          <Field
            type="password"
            name="repeatPassword"
            autoComplete="new-password"
          ></Field>

          <button type="submit">Sign Up</button>
        </Form>
      </Formik>
    </div>
  );
};

export default RegisterForm;
