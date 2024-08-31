import { Suspense } from 'react';
import PropTypes from 'prop-types';
// import Header from '../Header/Header';
import css from './SharedLayout.modal.css';

export const SharedLayout = ({ children }) => {
  return (
    <div className={css.container}>
      {/* <Header /> */}
      <Suspense fallback={null}>{children}</Suspense>
    </div>
  );
};

SharedLayout.propTypes = {
  children: PropTypes.node.isRequired,
};
