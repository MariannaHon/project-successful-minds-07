import * as React from 'react';
import Modal from '@mui/material/Modal';
import css from './UserLogoModal.module.css';
import { GoChevronDown } from 'react-icons/go';
import SettingModal from '../SettingModal/SettingModal.jsx';
import UserLogoutModal from '../UserLogoutModal/UserLogoutModal.jsx';



const UserLogoModal = () => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div className={css.wrap}>
      <button className={css.btn} onClick={handleOpen}>
        <GoChevronDown className={css.blueIcon} />
      </button>
      <div className={css.box}>
        <Modal
          open={open}
          onClose={handleClose}
          sx={{
            '& .MuiBackdrop-root': {
              backgroundColor: 'transparent',
            },
          }}
        >
          <div className={css.container}>
            <SettingModal />
            <UserLogoutModal />
          </div>
        </Modal>
      </div>
    </div>
  );
};

export default UserLogoModal;
