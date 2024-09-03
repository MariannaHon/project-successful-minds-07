
import { useNavigate } from 'react-router-dom';
import { selectIsLoggedIn } from '../../redux/auth/selectors';

import { useSelector } from 'react-redux';
import css from "./Logo.module.css";

const Logo = () => {

  const isLoggedIn = useSelector(selectIsLoggedIn);
  const navigate = useNavigate();

  const logoClick = () => {
    navigate(isLoggedIn ? "/home" : "/welcome");
  }

  return (

    <div onClick={logoClick}>
      <svg width="40" height="48" className={css.icons}>
        <use href="/symbol-defs.svg#icon-Logo-2" >
        </use>
      </svg>
    </div>
  )
}

export default Logo
