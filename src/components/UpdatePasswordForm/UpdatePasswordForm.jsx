
import { useDispatch } from 'react-redux';
import { updatePassword } from '../../redux/auth/operations';
import css from './UpdatePasswordForm.module.css';
import * as Yup from 'yup';
import { Field, Form, Formik, ErrorMessage } from 'formik';
import { useId } from 'react';
import { toast } from 'react-toastify';
const UpdatePasswordForm = () => {


  const dispatch = useDispatch();
  
  const onSubmit = (values, actions) => {
    const token = new URLSearchParams(window.location.search).get('token');
    const newUser = {
      
      password: values.new_password || values.confirm_new_password, token
    };
    dispatch(updatePassword(newUser))
      .unwrap()
      .then(() => {})
      .catch(() => {
        toast.error('Passwords did not happen', {
          position: 'top-right',
        });
      });
    actions.resetForm();
  };

  const validationSchema = Yup.object().shape({
    new_password: Yup.string()
      .min(8, 'Too short password')
      .max(64, 'Too long password')
      .required('Password is Required'),
    confirm_new_password: Yup.string()
      .oneOf([Yup.ref('new_password'), null], 'Passwords must match')
      .required('Repeat Password is Required'),
  });
  const id = useId();
  

  return (
    <Formik
      initialValues={{ new_password: '', confirm_new_password: '' }}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
      >
              
      {({ errors, touched }) => (
        <Form className={css.formContainer} noValidate name="Update password">
          <label htmlFor="new_password" className={css.label}>
            Enter new password
          </label>
          <div className={css.wrap}>
            <Field
              type="password"
              name="new_password"
              id={`${id}-new_password`}
              className={`${css.input} ${
                errors.new_password && touched.new_password
                  ? errors.new_password === 'Too short password'
                    ? css.short
                    : errors.new_password === 'Too long password'
                    ? css.long
                    : errors.new_password === 'Password is Required'
                    ? css.required
                    : css.invalid
                  : touched.new_password && !errors.new_password
                  ? css.valid
                  : ''
              }`}
              
              placeholder="New password"
            />
            <ErrorMessage
              name="new_password"
              component="span"
              className={css.errorMessage}
            />
          </div>

          <label htmlFor="confirm_new_password" className={css.label}>
            Confirm new password
          </label>
          <div className={css.wrap}>
            <Field
              type="password"
              name="confirm_new_password"
                id={`${id}-confirm_new_password`}
                className={`${css.input} ${
                errors.confirm_new_password && touched.confirm_new_password
                  ? css.mismatch
                  : touched.confirm_new_password && !errors.confirm_new_password
                  ? css.valid
                  : ''
              }`}
              placeholder="Confirm password"
              autoComplete="new-password"
            />
            <ErrorMessage
              name="confirm_new_password"
              component="span"
              className={css.errorMessage}
            />
          </div>

          <button type="submit" className={css.submitButton}>
            Save
          </button>
        </Form>
      )}
    </Formik>
  );
};

export default UpdatePasswordForm;