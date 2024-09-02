
import css from "./Header.module.css";

// import { NavLink, Navigate } from 'react-router-dom';
// import { useSelector } from 'react-redux';
// import { selectIsLoggedIn } from "../../redux/auth/selectors";
import UserAuth from "../UserAuth/UserAuth.jsx";
// import UserLogo from "../UserLogo/UserLogo.jsx";
import Logo from '../Logo/Logo.jsx';
// import { useAuth } from "../../hooks/userAuth";

const Header = () => {
  // const { isLoggedIn } = useAuth();

  // const isLoggedIn = useSelector(selectIsLoggedIn);

  return (


    <header className={css.headerSection}>
      <Logo />
      <UserAuth />
    </header>


    // <header className={s.headerSection}>
    // <div className={s.headerWrapper}>
    //   <UserLogo />
    //   {!isLoggedIn ? <UserAuth /> : <UserLogo />}
    // </div>
  );
};

export default Header;