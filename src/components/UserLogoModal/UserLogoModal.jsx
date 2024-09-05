
import * as React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import css from './UserLogoModal.module.css';
import { GoChevronDown } from "react-icons/go";
import SettingModal from "../SettingModal/SettingModal.jsx";
import UserLogoutModal from '../UserLogoutModal/UserLogoutModal.jsx';

const style = {
  position: 'absolute',
  top: 140,
  right: 20,
  transform: 'translate(-50%, -50%)',
  minWidth: 118,
  minHight: 88,
  bgcolor: 'background.paper',
  border: 'none',
  borderRadius: 2,
  boxShadow: 24,
  p: 4,
};

const UserLogoModal = () => {

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);


  return (
    <div>
      <button onClick={handleOpen}><GoChevronDown className={css.blueIcon} /></button>
      <Modal open={open} onClose={handleClose}>
        <Box sx={style} >
          <div>
            <SettingModal />
            <UserLogoutModal />
          </div>
        </Box>
      </Modal>
    </div>
  );
};

export default UserLogoModal;