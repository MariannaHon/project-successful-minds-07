import { useDispatch } from 'react-redux';
import { updatePassword } from '../../redux/auth/operations';
import css from './UpdatePasswordForm.module.css';
import * as Yup from 'yup';
import { Field, Form, Formik, ErrorMessage } from 'formik';
import { useId } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import * as bcrypt from 'bcryptjs';

const UpdatePasswordForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const validationSchema = Yup.object().shape({
    new_password: Yup.string()
      .min(8, 'Password must be at least 8 characters')
      .max(64, 'Password must be no more than 64 characters')
      .required('Required'),
    confirm_new_password: Yup.string()
      .oneOf([Yup.ref('new_password'), null], 'Passwords must match')
      .required('Required'),
  });

  const passwordFieldId = useId();

  return (
    <Formik
      initialValues={{ new_password: '', confirm_new_password: '' }}
      validationSchema={validationSchema}
      onSubmit={async (values, actions) => {
        const { new_password } = values;
        const token = localStorage.getItem('token');

        try {
          const hashedPassword = await bcrypt.hash(new_password, 10);
          if (!validationSchema.isValidSync(values)) {
            toast.error('Please correct the errors in the form.');
            return;
          }
          const response = await dispatch(
            updatePassword({ new_password: hashedPassword, token })
          );

          if (response.status === 200) {
            toast.success('Password updated successfully!');
            navigate('/signin');
          } else if (response.status === 400) {
            toast.error('Invalid password or token.');
          } else if (response.status === 401) {
            toast.error('Unauthorized. Please sign in again.');

            localStorage.removeItem('token');
            navigate('/signin');
          } else if (response.status === 500) {
            toast.error('Server error. Please try again later.');
          } else {
            toast.error('Something went wrong. Please try again later.');
          }
        } catch (error) {
          toast.error(error.message);
        } finally {
          actions.setSubmitting(false);
        }
        actions.resetForm();
      }}
    >
      <Form className={css.formContainer} name="Update password">
        <label htmlFor={passwordFieldId} className={css.label}>
          Enter new password
        </label>
        <div className={css.wrap}>
          <Field
            type="password"
            name="new_password"
            id={passwordFieldId}
            className={css.inputField}
            placeholder="New password"
          />
          <ErrorMessage
            name="new_password"
            component="span"
            className={css.errorMessage}
          />
        </div>

        <label htmlFor={passwordFieldId} className={css.label}>
          Confirm new password
        </label>
        <div className={css.wrap}>
          <Field
            type="password"
            name="confirm_new_password"
            id={passwordFieldId}
            className={css.inputField}
            placeholder="Confirm password"
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
    </Formik>
  );
};

export default UpdatePasswordForm;

// import { useDispatch } from 'react-redux';
// import { updatePassword } from '../../redux/auth/operations';
// import css from './UpdatePasswordForm.module.css';
// import * as Yup from 'yup';
// import { Field, Form, Formik, ErrorMessage } from 'formik';
// import { useId } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { toast } from 'react-toastify';
// import * as bcrypt from 'bcryptjs';
// import { useState } from 'react';
// import { styled } from '@mui/material/styles';

// const UpdatePasswordForm = () => {
//   const [isPasswordInvalid, setIsPasswordInvalid] = useState(false);
//   const [isConfirmPasswordInvalid, setIsConfirmPasswordInvalid] =
//     useState(false);
//   const navigate = useNavigate();
//   const dispatch = useDispatch();

//   const validationSchema = Yup.object().shape({
//     new_password: Yup.string()
//       .min(8, 'Password must be at least 8 characters')
//       .max(64, 'Password must be no more than 64 characters')
//       .required('Required'),
//     confirm_new_password: Yup.string()
//       .oneOf([Yup.ref('new_password'), null], 'Passwords must match')
//       .required('Required'),
//   });

//   const passwordFieldId = useId();
// const StyledInput = styled('input')(({ theme, isInvalid }) => ({
//     width: '100%',
//     padding: '8px',
//     margin: '5px 0',
//     color: theme.palette.primary.main,
//     // border: 1px solid `${theme.palette.secondary.paleBlue}`,
//     // borderRadius: theme.shape.borderRadius,
//     // ...(isInvalid && {
//     //   border: 1px solid `${theme.palette.secondary.red}`,
//     //   color: theme.palette.secondary.red,
//     // }),
//     // '&:focus, &:hover, &:active': {
//     //   border: 1px solid ${theme.palette.secondary.blue},
//     // },
//     // '&::placeholder': {
//     //   color: theme.palette.secondary.blue,
//     },
//   })
// );
//   return (
//     <Formik
//       initialValues={{ new_password: '', confirm_new_password: '' }}
//       validationSchema={validationSchema}
//       onSubmit={async (values, actions) => {
//         const { new_password } = values;
//         const token = localStorage.getItem('token');

//         try {
//           const hashedPassword = await bcrypt.hash(new_password, 10);
//           if (!validationSchema.isValidSync(values)) {
//             toast.error('Please correct the errors in the form.');
//             return;
//           }
//           const response = await dispatch(
//             updatePassword({ new_password: hashedPassword, token })
//           );

//           if (response.status === 200) {
//             toast.success('Password updated successfully!');
//             navigate('/signin');
//           } else if (response.status === 400) {
//             toast.error('Invalid password or token.');
//           } else if (response.status === 401) {
//             toast.error('Unauthorized. Please sign in again.');

//             localStorage.removeItem('token');
//             navigate('/signin');
//           } else if (response.status === 500) {
//             toast.error('Server error. Please try again later.');
//           } else {
//             toast.error('Something went wrong. Please try again later.');
//           }
//         } catch (error) {
//           toast.error(error.message);
//         } finally {
//           actions.setSubmitting(false);
//         }
//         actions.resetForm();
//       }}
//     >
//       <Form className={css.formContainer} name="Update password">
//         <label htmlFor={passwordFieldId} className={css.label}>
//           Enter new password
//         </label>
//         <div className={css.wrap}>
//           <Field
//             type="password"
//             name="new_password"
//             id={passwordFieldId}
//             //className={`${css.inputField} ${isPasswordInvalid`? css.invalidInput : ''}}
//             placeholder="New password"
//              isInvalid={isPasswordInvalid}
//             onChange={(e) => {
//               setIsPasswordInvalid(
//                 !validationSchema.isValidSync({ new_password: e.target.value })
//               );
//             }}
//           />
//           <ErrorMessage
//             name="new_password"
//             component="span"
//             className={css.errorMessage}
//           />
//         </div>

//         <label htmlFor={passwordFieldId} className={css.label}>
//           Confirm new password
//         </label>
//         <div className={css.wrap}>
//           <Field
//             type="password"
//             name="confirm_new_password"
//             id={passwordFieldId}
//             //  className={`${css.inputField} ${isConfirmPasswordInvalid ? css.invalidInput : ''}}
//             placeholder="Confirm password"
//             onChange={e => {
//               setIsConfirmPasswordInvalid(
//                 !validationSchema.isValidSync({
//                   new_password: values.new_password,
//                   confirm_new_password: e.target.value,
//                 })
//               );
//             }}
//           />
//           <ErrorMessage
//             name="confirm_new_password"
//             component="span"
//             className={css.errorMessage}
//           />
//         </div>

//         <button type="submit" className={css.submitButton}>
//           Save
//         </button>
//       </Form>
//     </Formik>
//   );
// };

// export default UpdatePasswordForm;

// import { useDispatch } from 'react-redux';
// import { updatePassword } from '../../redux/auth/operations';
// import css from './UpdatePasswordForm.module.css';
// import * as Yup from 'yup';
// import {
//   //Field,
//   Form,
//   Formik,
//   ErrorMessage,
// } from 'formik';
// import { useId } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { toast } from 'react-toastify';
// import * as bcrypt from 'bcryptjs';
// import { useState } from 'react';
// import { styled } from '@mui/material/styles';

// const UpdatePasswordForm = () => {
//   const [isPasswordInvalid, setIsPasswordInvalid] = useState(false);
//   const [isConfirmPasswordInvalid, setIsConfirmPasswordInvalid] =
//     useState(false);
//   const navigate = useNavigate();
//   const dispatch = useDispatch();

//   const validationSchema = Yup.object().shape({
//     new_password: Yup.string()
//       .min(8, 'Password must be at least 8 characters')
//       .max(64, 'Password must be no more than 64 characters')
//       .required('Required'),
//     confirm_new_password: Yup.string()
//       .oneOf([Yup.ref('new_password'), null], 'Passwords must match')
//       .required('Required'),
//   });

//   const passwordFieldId = useId();

//   const StyledInput = styled('input')(({ theme, isInvalid }) => ({
//     width: '100%',
//     padding: '8px',
//     margin: '5px 0',
//     color: theme.palette.primary.main,
//     borderColor: theme.palette.secondary.paleBlue,
//     borderRadius: theme.shape.borderRadius,
//     ...(isInvalid && {
//       borderColor: theme.palette.secondary.red,

//       color: theme.palette.secondary.red,
//     }),
//   }));

//   return (
//     <Formik
//       initialValues={{ new_password: '', confirm_new_password: '' }}
//       validationSchema={validationSchema}
//       onSubmit={async (values, actions) => {
//         const { new_password } = values;
//         const token = localStorage.getItem('token');

//         try {
//           const hashedPassword = await bcrypt.hash(new_password, 10);
//           if (!validationSchema.isValidSync(values)) {
//             toast.error('Please correct the errors in the form.');
//             return;
//           }
//           const response = await dispatch(
//             updatePassword({ new_password: hashedPassword, token })
//           );

//           if (response.status === 200) {
//             toast.success('Password updated successfully!');
//             navigate('/signin');
//           } else if (response.status === 400) {
//             toast.error('Invalid password or token.');
//           } else if (response.status === 401) {
//             toast.error('Unauthorized. Please sign in again.');

//             localStorage.removeItem('token');
//             navigate('/signin');
//           } else if (response.status === 500) {
//             toast.error('Server error. Please try again later.');
//           } else {
//             toast.error('Something went wrong. Please try again later.');
//           }
//         } catch (error) {
//           toast.error(error.message);
//         } finally {
//           actions.setSubmitting(false);
//         }
//         actions.resetForm();
//       }}
//     >
//       <Form className="formContainer" name="Update password">
//         <label htmlFor={passwordFieldId} className="label">
//           Enter new password
//         </label>
//         <div className="wrap">
//           <StyledInput
//             type="password"
//             name="new_password"
//             id={passwordFieldId}
//             placeholder="New password"
//             isInvalid={isPasswordInvalid}
//             onChange={e => {
//               setIsPasswordInvalid(
//                 !validationSchema.isValidSync({ new_password: e.target.value })
//               );
//             }}
//           />
//           <ErrorMessage
//             name="new_password"
//             component="span"
//             className="errorMessage"
//           />
//         </div>

//         <label htmlFor={passwordFieldId} className="label">
//           Confirm new password
//         </label>
//         <div className="wrap">
//           <StyledInput
//             type="password"
//             name="confirm_new_password"
//             id={passwordFieldId}
//             placeholder="Confirm password"
//             isInvalid={isConfirmPasswordInvalid}
//             onChange={e => {
//               setIsConfirmPasswordInvalid(
//                 !validationSchema.isValidSync({
//                   new_password: values.new_password,
//                   confirm_new_password: e.target.value,
//                 })
//               );
//             }}
//           />
//           <ErrorMessage
//             name="confirm_new_password"
//             component="span"
//             className="errorMessage"
//           />
//         </div>

//         <button type="submit" className="submitButton">
//           Save
//         </button>
//       </Form>
//     </Formik>
//   );
// };

// export default UpdatePasswordForm;
