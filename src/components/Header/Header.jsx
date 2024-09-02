import { NavLink, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectIsLoggedIn } from "../../redux/auth/selectors";
import UserAuth from '../UserAuth/UserAuth.jsx';
import Logo from '../Logo/Logo.jsx';

const Header = () => {
    const isLoggedIn = useSelector(selectIsLoggedIn);

    return (
        <header>
            <Logo />
            <UserAuth />
        </header>
      );
};
export default Header;
