import './App.css';
//import { WaterСonsumptionTracker } from '../../components/WaterСonsumptionTracker/WaterСonsumptionTracker.jsx';

// function App() {
//   return (
//     <>

//     </>
//   );
// }

// export default App;
//import { useEffect, lazy } from 'react';
//import { useDispatch, useSelector } from 'react-redux';
import { Route, Routes } from 'react-router-dom';
// import { Layout } from './Layout';
// import { PrivateRoute } from './PrivateRoute';
// import { RestrictedRoute } from './RestrictedRoute';
// import { refreshUser } from '../redux/auth/operations';
// import { selectIsRefreshing } from '../redux/auth/selectors';

// import { Toaster } from 'react-hot-toast';
import WelcomePage from '../../pages/WelcomePage/WelcomePage.jsx';
// const HomePage = lazy(() => import('../pages/homePage/HomePage'));
// const RegistrationPage = lazy(() =>
//   import('../pages/registrationPage/RegistrationPage')
// );
// const LoginPage = lazy(() => import('../pages/loginPage/LoginPage'));
// const ContactsPage = lazy(() => import('../pages/contactsPage/ContactsPage'));

export const App = () => {
  //   const dispatch = useDispatch();
  // const isRefreshing = useSelector(selectIsRefreshing);
  // useEffect(() => {
  //   dispatch(refreshUser());
  // }, [dispatch]);

  return (
    <Routes>
      <Route path="/welcome" element={<WelcomePage />} />
    </Routes>
  );
};
