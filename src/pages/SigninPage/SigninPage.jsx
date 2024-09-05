import { NavLink } from 'react-router-dom';
import AuthForm from '../../components/AuthForm/AuthForm';

import css from './SigninPage.module.css';

const SigninPage = () => {
  return (
    <div className={css.container}>
          {/* <picture>
        <source
          srcset="
            ./img/img_about_desktop_1440@1x.png 1x,
            ./img/img_about_desktop_1440@2x.png 2x
          "
          media="(min-width:1440px)"
        />
        <source
          srcset="
            ./img/img_about_desktop_1280@1x.png 1x,
            ./img/img_about_desktop_1280@2x.png 2x
          "
          media="(min-width:1280px)"
        />
        <source
          srcset="
            ./img/img_about_tablet@1x.png 1x,
            ./img/img_about_tablet@2x.png 2x
          "
          media="(min-width:768px)"
        />
        <source
          srcset="
            ./img/img_about_mobile@1x.png 1x,
            ./img/img_about_mobile@2x.png 2x
          "
          media="(max-width:767px)"
        />

        <img
          class="about-img"
          src="./img/img_about_mobile@1x.png"
          alt="Yacht at night"
        />
      </picture> */}
      <div className={css.container_signin}>
      <div className={css.image}></div>
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
    </div>
  );
};

export default SigninPage;
