import Header from "../Header/Header.jsx";
import PropTypes from 'prop-types';
import { Suspense } from "react";
import css from './SharedLayout.module.css';

export const SharedLayout = ({ children }) => {
  return (
    <div className={css.container}>
      <Header />
      <Suspense fallback={null}>{children}</Suspense>
    </div>
  );
};

SharedLayout.propTypes = {
  children: PropTypes.node.isRequired,
};

