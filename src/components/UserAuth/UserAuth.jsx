import { useNavigate } from "react-router-dom";
import css from "./UserAuth.module.css";

const UserAuth = () => {
  const navigate = useNavigate();

  const authClick = () => {
    navigate('/signin');
  }

  return (
    <div className={css.userAuthWrapper}>
      <button className={css.userAuthLink} type="button" onClick={authClick}>
        Sign in
      </button>
      <svg width="28" height="28" className={css.icons}>
        <use href="/project-successful-minds-07/symbol-defs.svg#icon-user" >
        </use>
      </svg>
    </div>
  );
};

export default UserAuth;
