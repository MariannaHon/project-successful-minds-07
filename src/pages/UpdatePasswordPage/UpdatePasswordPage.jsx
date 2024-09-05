import UpdatePasswordForm from '../../components/UpdatePasswordForm/UpdatePasswordForm';
import css from './UpdatePasswordPage.module.css';

const UpdatePasswordPage = () => {
  return (
    <div className={css.container}>
      <div className={css.container_update}>
        <div className={css.background}>
          <h2 className={css.title}>Update password</h2>

          <UpdatePasswordForm />
        </div>
      </div>
    </div>
  );
};
export default UpdatePasswordPage;
