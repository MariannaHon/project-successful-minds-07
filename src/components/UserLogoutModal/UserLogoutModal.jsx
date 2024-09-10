import css from "./UserLogoutModal.module.css";
import { IoIosLogOut } from "react-icons/io";
import { IoClose } from "react-icons/io5";
import * as React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { logOut } from '../../redux/auth/operations'
import { useDispatch } from "react-redux";

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  maxWidth: 592,
  bgcolor: 'background.paper',
  border: 'none',
  borderRadius: 2,
  boxShadow: 24,
  p: 3,
};

const UserLogoutModal = () => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const dispatch = useDispatch();

  const handleLogOut = () => {
    dispatch(logOut());
    handleClose();
  }
  return (
    <div>
      <button onClick={handleOpen} className={css.userLogoModalButton}><IoIosLogOut />
        Log out</button>
      <Modal
        open={open}
        onClose={handleClose}>
        <Box sx={style} className={css.container}>
          <button onClick={handleClose} className={css.iconClose}><IoClose /></button>
          <div className={css.containerAll}>
            <div className={css.containerText}>
              <h1>Log out</h1>
              <h3>Do you really want to leave?</h3></div>
            <div className={css.containerButton}>
              <button type="button" className={css.buttonCans} onClick={handleClose}>Cancel</button>
              <button onClick={handleLogOut} className={css.buttonLogout}
                type="button" >Log out</button>
            </div>
          </div>
        </Box>
      </Modal>
    </div>
  );
};
export default UserLogoutModal;

