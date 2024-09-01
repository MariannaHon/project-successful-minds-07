import { NavLink, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectIsLoggedIn } from "../../redux/auth/selectors";

const Header = () => {
    const isLoggedIn = useSelector(selectIsLoggedIn);

    return (
        <header>
          {isLoggedIn ? <Navigate to="/home" replace /> : <NavLink to="/signup">Sign up</NavLink>}
        </header>
      );
};
export default Header;
