import { lazy } from 'react';
import { Routes, Route } from 'react-router-dom';
import { RestrictedRoute } from '../RestrictedRoute/RestrictedRoute';
import { SharedLayout } from '../SharedLayout/SharedLayout';
import { PrivateRoute } from '../PrivateRoute/PrivateRoute';

const HomePage = lazy(() => import('../../pages/HomePage/HomePage'));
const SignupPage = lazy(() => import('../../pages/SignupPage/SignupPage'));
const SigninPage = lazy(() => import('../../pages/SigninPage/SigninPage'));
const WelcomePage = lazy(() => import('../../pages/WelcomePage/WelcomePage'));
const NotFoundPage = lazy(() =>
  import('../../pages/NotFoundPage/NotFoundPage')
);

export default function App() {
  return (
    <div>
      <SharedLayout>
        <Routes>
          <Route path="/welcome" component={<WelcomePage />} />
          <Route
            path="/signup"
            element={
              <RestrictedRoute redirectTo="/home" component={SignupPage} />
            }
          />
          <Route
            path="/signin"
            element={
              <RestrictedRoute component={SigninPage} redirectTo="/home" />
            }
          />
          <Route
            path="/home"
            element={<PrivateRoute component={HomePage} redirectTo="/signin" />}
          />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </SharedLayout>
    </div>
  );
}
