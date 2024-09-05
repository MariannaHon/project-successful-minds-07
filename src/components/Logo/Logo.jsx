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
      <svg width="102" height="48" className={css.icons}>
        <use href="/project-successful-minds-07/symbol-defs.svg#icon-Logo-2" >
        </use>
      </svg>
    </div>
  );
}

export default Logo;
