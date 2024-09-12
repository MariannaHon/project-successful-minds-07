import * as React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import css from './UserLogoModal.module.css';
import { GoChevronDown } from 'react-icons/go';
import SettingModal from '../SettingModal/SettingModal.jsx';
import UserLogoutModal from '../UserLogoutModal/UserLogoutModal.jsx';
import { styled } from '@mui/material/styles';

const CustomBox = styled(Box)(({ theme }) => ({
  padding: 'var(--icon-size-smaller)',
  position: 'fixed',
  borderRadius: 'var(--border-radius-smaller)',
  backgroundColor: 'var(--primary-white)',
  boxShadow: 'var(--box-shadow-light)',
  border: 'none',
  width: '118px',
  height: '88px',
  top: 100,
  right: 0,
  transform: 'translate(-50%, -50%)',
  zIndex: 1300,
  [theme.breakpoints.down('xs')]: {
    top: 120,
    right: 0,
  },
  [theme.breakpoints.between('sm', 'md')]: {
    top: 120,
    right: 0,
  },
  [theme.breakpoints.between('md', 'lg')]: {
    top: 120,
    right: 100,
  },
  [theme.breakpoints.between('lg', 'xl')]: {
    top: 120,
    right: 100,
  },
  [theme.breakpoints.up('xl')]: {
    top: 120,
    right: 330,
  },
}));

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
          <CustomBox>
            <div className={css.container}>
              <SettingModal />
              <UserLogoutModal />
            </div>
          </CustomBox>
        </Modal>
      </div>
    </div>
  );
};

export default UserLogoModal;
