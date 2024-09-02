<<<<<<< Updated upstream
=======

import css from "./UserLogo.module.css";
// import { useAuth } from "../../redux/authUser/selectors";
import { useDispatch, useSelector } from "react-redux";
import { useState } from 'react';
import { selectUser } from '../../redux/auth/selectors.js'
// import { useModal } from "../../userModal/userModal";
import { setModalContent, setModalStatus } from "../../redux/modal/modalSlice";

const UserLogo = () => {
    // const { user } = useAuth();
    const dispatch = useDispatch();
    const user = useSelector(selectUser);
    const [modalOpen, setModalOpen] = useState(false);

    const handleToggleModal = () => {
        setModalOpen(!modalOpen);

        dispatch(setModalStatus(modalOpen));
        dispatch(setModalContent("UserLogoModal"));
    };

    const getUserAvatarContent = () => {
        if (user.avatarURL) {
            return <img className={css.userLogoImg} src={user.avatarURL} alt="avatar" />;
        } else if (user.name) {
            return <div className={css.userInitial}>{user.name.charAt(0).toUpperCase()}</div>;
        } else {
            return <div className={css.userInitial}>{user.email.charAt(0).toUpperCase()}</div>;
        }
    }

    // const { modalStatus } = useModal();

    // const handleOpenUserModal = () => {
    //     dispatch(setModalStatus(!modalStatus));
    //     dispatch(setModalContent("UserLogoModal"));
    // };

    return (
        <div className={css.userLogoWrapper}
            onClick={handleToggleModal}>
            <p className={css.userLogoName}>{user.name || user.email}</p>
            {getUserAvatarContent()}
            {/* <img className={css.userLogoImg} src={user.avatarURL} alt="avatarURL" /> */}
            {/* onClick={handleOpenUserModal} - було в батоні */}
            <button className={css.userLogoButton} >
                <svg className={css.userLogoSvg}>
                    <use href="/symbol-defs.svg#icon-chevron-double-up" />
                </svg>
            </button>
        </div>
    );
};

export default UserLogo;

>>>>>>> Stashed changes
