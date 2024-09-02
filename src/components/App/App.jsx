
import { lazy, Suspense } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { RestrictedRoute } from '../RestrictedRoute/RestrictedRoute';
import { SharedLayout } from '../SharedLayout/SharedLayout';
import { PrivateRoute } from '../PrivateRoute/PrivateRoute';
import { Toaster } from 'react-hot-toast';
import './App.css';

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
      <Suspense fallback={<Toaster />}>
        <Routes>
          <Route path="/" element={<Navigate to="/welcome" />} />
          <Route path="/welcome" element={<WelcomePage />} />
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
        </Suspense>
      </SharedLayout>
    </div>
  );
}
