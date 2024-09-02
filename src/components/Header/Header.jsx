// const Header = () => {};
// export default Header;

import UserAuth from '../UserAuth/UserAuth.jsx';
import Logo from '../Logo/Logo.jsx';

import css from './Header.module.css'

export default function Header() {

    return (
        <header className={css.head}>
            <Logo />
            <UserAuth />
        </header>
    )
}