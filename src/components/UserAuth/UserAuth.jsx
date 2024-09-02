
import { useNavigate } from "react-router-dom"

// import { Link } from "react-router-dom";
import css from "./UserAuth.module.css";

const UserAuth = () => {

  const navigate = useNavigate();

  const authClick = () => {
    navigate('/signin');
  }

  return (

    <div>
      <button className={css.userAuthLink} type="button" onClick={authClick}>Sign in</button>
      <svg width="40" height="48" className={css.icons}>
        <use href="/symbol-defs.svg#icon-user" >
        </use>
      </svg>
    </div>

    // <div className={s.userAuthWrapper}>
    //   <Link className={s.userAuthLink} to={"/signin"}>
    //     Sign in
    //   </Link>
    //   <svg width="28" height="28"></svg>
    // </div>
  );
};

export default UserAuth;
