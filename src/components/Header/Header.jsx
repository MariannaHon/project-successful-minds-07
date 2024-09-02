
import css from "./Header.module.css";

// import { NavLink, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectIsLoggedIn } from "../../redux/auth/selectors";
import UserAuth from "../UserAuth/UserAuth.jsx";
import UserLogo from "../UserLogo/UserLogo.jsx";
import Logo from '../Logo/Logo.jsx';


const Header = () => {

  const isLoggedIn = useSelector(selectIsLoggedIn);

  return (
    <header className={css.headerSection}>
      <Logo />
      {isLoggedIn ? <UserLogo /> : <UserAuth />}
    </header>
  );
};

export default Header;
