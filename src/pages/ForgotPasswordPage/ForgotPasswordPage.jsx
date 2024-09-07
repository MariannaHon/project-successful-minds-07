import { NavLink } from 'react-router-dom';
import css from './ForgotPasswordPage.module.css';
import ForgotPasswordForm from '../../components/ForgotPasswordForm/ForgotPasswordForm';
const ForgotPasswordPage = () => {
  return (
    <div className={css.container}>
      <div className={css.background}>
        <div className={css.image}></div>
        <div className={css.container_signin}>
          <h2 className={css.title}>Forgot Password</h2>
          <ForgotPasswordForm />
          <div className={css.container_links}>
            <NavLink className={css.link} to="/signin">
              Sign in
            </NavLink>
          </div>
        </div>
      </div>
    </div>
  );
};
export default ForgotPasswordPage;
