import css from '../NotFoundPage/NotFoundPage.module.css';
import { Link } from 'react-router-dom';
import HomePage from '../HomePage/HomePage';
export default function NotFoundPage() {
  return (
    <p className={css.text}>
      Sorry, page not found! Please go to
      <Link to="/welcome" className={css.link}>
        Welcome Page!
      </Link>

<HomePage/>
    </p>
  );
}
