import s from "./UserLogoModal.module.css";
// import sprite from "../../../images/svg/sprite.svg";
import { useDispatch } from "react-redux";
import { setModalContent } from "../../../redux/modal/modalSlice";
import * as React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import css from './UserLogoModal.module.css';
import { GoChevronDown } from "react-icons/go";
import SettingModal from "../SettingModal/SettingModal.jsx";
import UserLogoutModal from '../UserLogoutModal';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};


const UserLogoModal = () => {

  const dispatch = useDispatch();

  const handleOpenUserSettings = () => {
    dispatch(setModalContent("UserSettings"));
  };

  const handleOpenLogOut = () => {
    dispatch(setModalContent("LogOut"));
  };
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);


  return (
    <div className={s.userLogoModalWrapper}>
       <button onClick={handleOpen}><GoChevronDown className={css.blueIcon}/></button>
       <Modal open={open} onClose={handleClose}>
        <Box sx={style} >      
        <div><SettingModal onClick={handleOpenUserSettings}/></div>   
        <div><UserLogoutModal onClick={handleOpenLogOut}/></div>
      </Box>
      </Modal>
    </div>

  );
};

export default UserLogoModal;

