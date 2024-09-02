import { Link } from "react-router-dom";
import s from "./UserAuth.module.css";

const UserAuth = () => {
  return (
    <div className={s.userAuthWrapper}>
      <Link className={s.userAuthLink} to={"/signin"}>
        Sign in
      </Link>
      <svg width="28" height="28"></svg>
    </div>
  );
};

export default UserAuth;
