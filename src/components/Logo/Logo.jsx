import { useNavigate } from 'react-router-dom';
import { selectIsLoggedIn } from '../../redux/auth/selectors';
import css from './Logo.module.css';

import { useSelector } from 'react-redux';

const Logo = () => {

    const isLoggedIn = useSelector(selectIsLoggedIn);
    const navigate = useNavigate();

    const logoClick = () => {
        navigate(isLoggedIn ? "/home" : "/welcome");
    }

    return (
        <div onClick={logoClick}>
            <svg className={css.icons}>
                <use href="/symbol-defs.svg#icon-Logo-2" width="40" height="40">
                </use>
            </svg>
        </div>
    )
}

export default Logo
