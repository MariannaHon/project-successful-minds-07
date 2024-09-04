
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

    <div>
      <svg width="40" height="40" className={css.icons}>
        <use href="./../../dist/favicon-32x32.png" width="40" height="40"></use>
      </svg>
    </div>
  )
}

export default Logo
