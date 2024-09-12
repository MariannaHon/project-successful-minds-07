import * as React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import css from './UserLogoModal.module.css';
import { GoChevronDown } from 'react-icons/go';
import SettingModal from '../SettingModal/SettingModal.jsx';
import UserLogoutModal from '../UserLogoutModal/UserLogoutModal.jsx';
import { styled } from '@mui/material/styles';

const CustomBox = styled(Box)({
  padding: 'var(--icon-size-smaller)',
  position: 'fixed',
  borderRadius: 'var(--border-radius-smaller)',
  backgroundColor: 'var(--primary-white)',
  boxShadow: 'var(--box-shadow-light)',
  border: 'none',
  width: '118px',
  height: '88px',
  top: 100,
  right: -30,
  transform: 'translate(-50%, -50%)',
  zIndex: 1300,
  '@media (min-width: 768px)': {
    top: 120,
  },
  '@media (min-width: 1440px)': {
    right: 90,
  },
});

const UserLogoModal = () => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div className={css.wrap}>
      <button className={css.btn} onClick={handleOpen}>
        <GoChevronDown className={css.blueIcon} />
      </button>
      <Modal
        open={open}
        onClose={handleClose}
        sx={{
          '& .MuiBackdrop-root': {
            backgroundColor: 'transparent',
          },
        }}
      >
        <CustomBox>
          <div className={css.container}>
            <SettingModal />
            <UserLogoutModal />
          </div>
        </CustomBox>
      </Modal>
    </div>
  );
};

export default UserLogoModal;
