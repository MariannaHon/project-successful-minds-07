
import { Formik, Form, Field } from 'formik';
import { useDispatch } from 'react-redux';
import * as Yup from 'yup';
import { ErrorMessage } from 'formik';
import { signin } from '../../redux/auth/operations';


const AuthForm = () => {

    const dispatch = useDispatch();

    const handleSubmit = (values, actions) => {
        dispatch(signin(values));
        actions.resetForm();
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
                initialValues={{ email: '', password: '' }}
                onSubmit={handleSubmit}
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

                    <button type="submit">Forgot password?</button>

                    <button type="submit">Sign Up</button>
                </Form>
            </Formik>
        </div>
    )
}

export default AuthForm
