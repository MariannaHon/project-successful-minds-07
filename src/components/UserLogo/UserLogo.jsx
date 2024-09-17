import Avatar from '@mui/material/Avatar';
import { useSelector } from 'react-redux';
import { selectUser } from '../../redux/auth/selectors.js';
import UserLogoModal from '../UserLogoModal/UserLogoModal.jsx';
import { stringAvatar } from './utils.js';
import css from './UserLogo.module.css';

const UserLogo = () => {
  const user = useSelector(selectUser);

  const getUserAvatarContent = () => {
    if (user.avatarUrl && user.name) {
      return (
        <div className={css.userLogoWrapper}>
          <p className={css.userLogoName}>{user.name}</p>
          <img className={css.userLogoImg} src={user.avatarUrl} alt="avatar" />
        </div>
      );
    } else if (user.name) {
      return (
        <div className={css.userLogoWrapper}>
          <p className={css.userLogoName}>{user.name}</p>
          <Avatar {...stringAvatar(user.name)} />
        </div>
      );
    } else {
      return (
        <div className={css.userLogoWrapper}>
          <Avatar {...stringAvatar('', user.email)} />
        </div>
      );
    }
  };

  return (
    <div className={css.userLogoWrapper}>
      <div className={css.userLogoName}>{getUserAvatarContent()}</div>
      <UserLogoModal />
    </div>
  );
};

export default UserLogo;
