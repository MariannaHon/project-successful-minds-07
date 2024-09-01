// const Header = () => {};
// export default Header;

import UserAuth from '../UserAuth/UserAuth.jsx';
import Logo from '../Logo/Logo.jsx';
import { selectIsLoggedIn } from '../../redux/auth/selectors';

import { useSelector } from 'react-redux';
import css from './Header.module.css'

export default function Header() {

    const isLoggedIn = useSelector(selectIsLoggedIn);

    return (
        <header className={css.head}>
            <p className={css.text}>Contacts App</p>
            <Navigation />
            {isLoggedIn ? <UserMenu /> : <AuthNav />}
        </header>
    )
}