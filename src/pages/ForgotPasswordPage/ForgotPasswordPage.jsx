import { NavLink } from 'react-router-dom';
import css from './ForgotPasswordPage.module.css';
import ForgotPasswordForm from "../../components/ForgotPasswordForm/ForgotPasswordForm";

const ForgotPasswordPage = ()=>{
return(
    <>
    <ForgotPasswordForm></ForgotPasswordForm>
    <NavLink className={css.link} to="/signin">Sign in</NavLink>
    </>
)
}
export default ForgotPasswordPage;