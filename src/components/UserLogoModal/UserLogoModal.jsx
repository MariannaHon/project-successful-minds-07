import s from "./UserLogoModal.module.css";
import sprite from "../../../images/svg/sprite.svg";
import { useDispatch } from "react-redux";
import { setModalContent } from "../../../redux/modal/modalSlice";

const UserLogoModal = () => {

  const dispatch = useDispatch();

  const handleOpenUserSettings = () => {
    dispatch(setModalContent("UserSettings"));
  };

  const handleOpenLogOut = () => {
    dispatch(setModalContent("LogOut"));
  };

  return (
    <div className={s.userLogoModalWrapper}>
      <button
        onClick={handleOpenUserSettings}
        className={s.userLogoModalButton}
        type="button"
      >
        <svg className={s.userLogoModalSvg}>
          <use href={`${sprite}#icon-cog-6-tooth`} />
        </svg>
        Setting
      </button>
      <button
        onClick={handleOpenLogOut}
        className={s.userLogoModalButton}
        type="button"
      >
        <svg className={s.userLogoModalSvg}>
          <use href={`${sprite}#icon-arrow-right-on-rectangle`} />
        </svg>
        Log out
      </button>
    </div>
  );
};

export default UserLogoModal;

