import css from './ForgotPasswordForm.module.css';
import * as Yup from 'yup';
import { Field, Form, Formik, ErrorMessage } from 'formik';
import { useDispatch } from 'react-redux';
import { forgotPassword } from '../../redux/auth/operations';
import { useId } from 'react';
import { Toaster } from 'react-hot-toast';

const ForgotPasswordForm = () => {
  const mailFieldId = useId();
  const forgot = Yup.object().shape({
    email: Yup.string()
      .email('Please enter a valid email address')
      .required('Email is Required'),
  });
  const dispatch = useDispatch();
  const onSubmit = (values, actions) => {
    const userEmail = { email: values.email };
    dispatch(forgotPassword(userEmail))
      .unwrap()
    // .then(() => {})
    // .catch(() => {
    //   toast.error('Passwords did not happen', {
    //     position: 'top-right',
    //   });
    // });
    actions.resetForm();
  };
  return (
    <>
      <Toaster />
      <Formik
        initialValues={{ email: '' }}
        validationSchema={forgot}
        onSubmit={onSubmit}
      >
        {({ errors, touched }) => (
          <Form className={css.formContainer} name="ForgotPassword" noValidate>
            <label htmlFor={mailFieldId} className={css.label}>
              Enter your email
            </label>
            <div className={css.wrap}>
              <Field
                type="email"
                name="email"
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
            <button type="submit" className={css.submitButton}>
              Send
            </button>
          </Form>
        )}
      </Formik>
    </>
  );
};
export default ForgotPasswordForm;
