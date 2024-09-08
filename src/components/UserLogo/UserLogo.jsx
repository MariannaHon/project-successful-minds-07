import css from './UserLogo.module.css';
import { useSelector } from 'react-redux';
// import { useState } from 'react';
import { selectUser } from '../../redux/auth/selectors.js';
import UserLogoModal from '../UserLogoModal/UserLogoModal.jsx';

const UserLogo = () => {

  const user = useSelector(selectUser);

  const getUserAvatarContent = () => {
    if (user.avatarUrl) {
      return (
        <img className={css.userLogoImg} src={user.avatarUrl} alt="avatar" />
      );
    } else if (user.name) {
      return (
        <div className={css.userInitial}>
          {user.name.charAt(0).toUpperCase()}
        </div>
      );
    } else {
      return (
        <div className={css.userInitial}>
          {user.email.charAt(0).toUpperCase()}
        </div>
      );
    }
  };

  return (
    <div className={css.userLogoWrapper}>
      <p className={css.userLogoName}>{user.name || user.email}</p>
      {getUserAvatarContent()}
      <UserLogoModal />
    </div>
  );
};

export default UserLogo;