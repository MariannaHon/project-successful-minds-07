<<<<<<< Updated upstream

import AuthForm from '../../components/AuthForm/AuthForm.jsx'
=======
import { Helmet } from 'react-helmet';
import { NavLink } from 'react-router-dom';
import AuthForm from '../../components/AuthForm/AuthForm';
>>>>>>> Stashed changes
import css from './SigninPage.module.css';

const SigninPage = () => {
    return (
<<<<<<< Updated upstream
        <div>
            <AuthForm />
=======
        <div className={css.container}>
            <Helmet>
                <title>SignIn to Tracker of Water</title>
            </Helmet>

            <div className={css.container_signin}>
                <div className={css.background}>
                    <h2 className={css.title}>Sign In</h2>

                    <AuthForm />
                    <NavLink className={css.link} to="/forgot-password">
                        Forgot your password?
                    </NavLink>
                    <NavLink className={css.link} to="/signup">
                        Sign up
                    </NavLink>
                </div>
            </div>
            <div className={css.image}></div>
>>>>>>> Stashed changes
        </div>
    )
}

export default SigninPage
