import { useSelector } from 'react-redux';
import { selectIsLoggedIn } from '../../redux/auth/selectors';
import UserAuth from '../UserAuth/UserAuth.jsx';
import UserLogo from '../UserLogo/UserLogo.jsx';
import Logo from '../Logo/Logo.jsx';
import css from './Header.module.css';

const Header = () => {
  const isLoggedIn = useSelector(selectIsLoggedIn);

  return (
    <div className={css.headerSection}>
      <header className={css.headerWrapper}>
        <div>
          <Logo />
        </div>
        <div>{isLoggedIn ? <UserLogo /> : <UserAuth />}</div>
      </header>
    </div>
  );
};

export default Header;
