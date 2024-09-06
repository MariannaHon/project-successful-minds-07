import { lazy, Suspense, useEffect } from 'react';

import { Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import { RestrictedRoute } from '../RestrictedRoute/RestrictedRoute';
import { SharedLayout } from '../SharedLayout/SharedLayout';
import { PrivateRoute } from '../PrivateRoute/PrivateRoute';

import { refreshUser } from '../../redux/auth/operations';
import { selectIsRefresh } from '../../redux/auth/selectors';

import { Toaster } from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';

const UpdatePasswordPage = lazy(() =>
  import('../../pages/UpdatePasswordPage/UpdatePasswordPage')
);
const HomePage = lazy(() => import('../../pages/HomePage/HomePage'));
const SignupPage = lazy(() => import('../../pages/SignupPage/SignupPage'));
const SigninPage = lazy(() => import('../../pages/SigninPage/SigninPage'));
//const WelcomePage = lazy(() => import('../../pages/WelcomePage/WelcomePage'));
const ForgotPasswordPage = lazy(() =>
  import('../../pages/ForgotPasswordPage/ForgotPasswordPage')
);
const NotFoundPage = lazy(() =>
  import('../../pages/NotFoundPage/NotFoundPage')
);

export default function App() {
  const dispatch = useDispatch();
  const isRefresh = useSelector(selectIsRefresh);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const refresh = async () => {
      await dispatch(refreshUser());
      navigate(location.pathname);
    };

    refresh();
  }, [dispatch, location.pathname, navigate]);

  return isRefresh ? (
    <b>Refreshing user...</b>
  ) : (
    <div>
      <SharedLayout>
        <Suspense fallback={<Toaster />}>
          <Routes>
            <Route path="/welcome" element={<UpdatePasswordPage />} />
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
            <Route
              path="/home"
              element={
                <PrivateRoute component={HomePage} redirectTo="/welcome" />
              }
            />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </Suspense>
      </SharedLayout>
    </div>
  );
}
