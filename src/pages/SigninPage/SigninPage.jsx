// import { Helmet } from 'react-helmet';
import { NavLink } from 'react-router-dom';
import AuthForm from '../../components/AuthForm/AuthForm';
// import Header from 'components/Header/Header';
import css from './SignInPage.module.css';


export default function Signin() {
  console.log('--------------------------SIGNIN');

  return (
    <div className={css.container}>
      {/* <Helmet>
        <title>SignIn to Tracker of Water</title>
      </Helmet> */}

      {/* <Header /> */}
      <div className={css.container_signin}>
      <div className={css.background}>
        <h2 className={css.title}>Sign In</h2>
        
        <AuthForm />
        {/* <NavLink className={css.link} to="/forgot-password"> */}
        {/* Forgot your password?
      </NavLink>  */}
        <NavLink className={css.link} to="/signup">
          Sign up
        </NavLink>
        </div>
      </div>
      <div className={css.image}></div>
    </div>
  );
}
