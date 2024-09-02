import { Link } from "react-router-dom";
import s from "./Logo.module.css";

const HeaderLogo = () => {
  return (
    <Link to={"/"}>
      <div className={s.logoWrapper}>
        <svg width="40" height="48">
          <use href="#logo-icon" />
        </svg>
        <p className={s.logoText}>
          TRACKER
          <br />
          OF WATER
        </p>
      </div>
    </Link>
  );
};

export default HeaderLogo;


