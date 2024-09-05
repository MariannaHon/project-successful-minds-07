import { NavLink } from 'react-router-dom';
import AuthForm from '../../components/AuthForm/AuthForm';

import css from './SigninPage.module.css';

const SigninPage = () => {
  return (
    <div className={css.container}>
      <div className={css.background}>
        <div className={css.image}></div>
        <div className={css.container_signin}>
          <h2 className={css.title}>Sign In</h2>
          <AuthForm />
          <div className={css.container_links}>
            <NavLink className={css.link} to="/forgot-password">
              Forgot your password?
            </NavLink>
            <NavLink className={css.link} to="/signup">
              Sign up
            </NavLink>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SigninPage;
