import { lazy, Suspense, useEffect } from 'react';

import { Routes, Route } from 'react-router-dom';
import { RestrictedRoute } from '../RestrictedRoute/RestrictedRoute';
import { SharedLayout } from '../SharedLayout/SharedLayout';
import { PrivateRoute } from '../PrivateRoute/PrivateRoute';

import { refreshUser } from '../../redux/auth/operations';
import { selectIsLoading, selectIsRefresh } from '../../redux/auth/selectors';

import { Toaster } from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';

const UpdatePasswordPage = lazy(() =>
  import('../../pages/UpdatePasswordPage/UpdatePasswordPage')
);
const HomePage = lazy(() => import('../../pages/HomePage/HomePage'));
const SignupPage = lazy(() => import('../../pages/SignupPage/SignupPage'));
const SigninPage = lazy(() => import('../../pages/SigninPage/SigninPage'));
const WelcomePage = lazy(() => import('../../pages/WelcomePage/WelcomePage'));
const ForgotPasswordPage = lazy(() =>
  import('../../pages/ForgotPasswordPage/ForgotPasswordPage')
);
const NotFoundPage = lazy(() =>
  import('../../pages/NotFoundPage/NotFoundPage')
);
import Loader from '../Loader/Loader.jsx';

export default function App() {

  const isLoading = useSelector(selectIsLoading);
  const dispatch = useDispatch();
  const isRefresh = useSelector(selectIsRefresh);


  useEffect(() => {
    dispatch(refreshUser());
  }, [dispatch]);

  return isRefresh ? (
    <Loader />
  ) : (
    <div>
      <SharedLayout>
        <Toaster />
        <Suspense fallback={<Loader />}>
          <Routes>
            <Route path="/welcome" element={<WelcomePage />} />
            <Route path="/reset-password" element={<UpdatePasswordPage />} />
            <Route
              path="/"
              element={
                <PrivateRoute component={HomePage} redirectTo="/welcome" />
              }
            />
            <Route
              path="/signup"
              element={
                <RestrictedRoute component={SignupPage} redirectTo="/home" />
              }
            />
            <Route
              path="/signin"
              element={
                <RestrictedRoute component={SigninPage} redirectTo="/home" />
              }
            />
            <Route
              path="/forgot-password"
              element={
                <RestrictedRoute
                  component={ForgotPasswordPage}
                  redirectTo="/welcome"
                />
              }
            />
            {/* <Route
              path="/reset-password"
              element={
                <PrivateRoute
                  component={UpdatePasswordPage}
                  redirectTo="/signin"
                />
              }
            /> */}
            <Route
              path="/home"
              element={
                <PrivateRoute component={HomePage} redirectTo="/signin" />
              }
            />
            <Route path="*" element={<NotFoundPage />} />
            {isLoading && <Loader />}
          </Routes>
        </Suspense>
      </SharedLayout>
    </div>
  );
}
