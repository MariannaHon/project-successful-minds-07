import css from './ForgotPasswordForm.module.css';
import * as Yup from 'yup';
import { Field, Form, Formik, ErrorMessage } from 'formik';
// import { useDispatch } from 'react-redux';
// import { forgotPassword } from '../../redux/auth/operations';
import { useId } from 'react';
const ForgotPasswordForm = () => {
    const mailFieldId = useId();
  const forgot = Yup.object().shape({
    email: Yup.string()
      .email('Please enter a valid email address')
      .required('Required'),
  });
  // const dispatch = useDispatch();
  return (
    <Formik
      initialValues={{ email: '' }}
      validationSchema={forgot}
      onSubmit={(values, actions) => {
        const userEmail = { email: values.email };
        console.log(userEmail);
        // dispatch(forgotPassword(userEmail));
        actions.resetForm();
      }}
    >
        <Form className={css.formContainer} name="ForgotPassword" noValidate>
        <label htmlFor={mailFieldId} className={css.label}>
          Enter your email
        </label>
        <div className={css.wrap}>
          <Field
            type="email"
            name="email"
            // autoComplete="off"
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
        <button type="submit" className={css.submitButton}>
          Send
        </button>
        </Form>

    </Formik>
  );
};
export default ForgotPasswordForm;
