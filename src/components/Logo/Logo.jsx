import { useNavigate } from 'react-router-dom';
import { selectIsLoggedIn } from '../../redux/auth/selectors';
import { useSelector } from 'react-redux';
import css from "./Logo.module.css";

const Logo = () => {
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const navigate = useNavigate();

  const logoClick = () => {
    navigate(isLoggedIn ? "/home" : "/welcome");
  };

  return (
    <div className={css.logoWrapper} onClick={logoClick}>
      <img 
        src="/android-chrome-192x192.png" 
        alt="Logo" 
        width="40" 
        height="48" 
        className={css.icons} 
      />
      <p className={css.logoTekst}>
        TRACKER
        <br />
        OF WATER
      </p>
    </div>
  );
}

export default Logo;
