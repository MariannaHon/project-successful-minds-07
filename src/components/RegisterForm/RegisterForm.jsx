import { Formik, Form, Field } from 'formik';
import { useDispatch } from 'react-redux';
import * as Yup from 'yup';
import { ErrorMessage } from 'formik';
import { register } from '../../redux/auth/operations';
import toast from 'react-hot-toast';

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
    <div>
      <Formik
        initialValues={{ email: '', password: '', repeatPassword: '' }}
        onSubmit={onSubmit}
        validationSchema={formSchema}
      >
        <Form>
          <Field type="email" name="email" autoComplete="off"></Field>
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
