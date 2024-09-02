import Header from "../Header/Header";
import PropTypes from 'prop-types';
import { Suspense } from "react";
import css from './SharedLayout.module.css';

const SharedLayout = ({ children }) => {
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

export default SharedLayout;

