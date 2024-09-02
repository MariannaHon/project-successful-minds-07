

import s from "./Header.module.css";

import UserLogo from "../Logo/Logo";
import UserAuth from "../UserAuth/UserAuth";
// import UserLogo from "../UserLogo/UserLogo";
import { useAuth } from "../../hooks/userAuth";

const Header = () => {
  const { isLoggedIn } = useAuth();
  return (
    // <header className={s.headerSection}>
      <div className={s.headerWrapper}>
        <UserLogo />
        {!isLoggedIn ? <UserAuth /> : <UserLogo />} 
      </div>
   
  );
};


export default Header;
