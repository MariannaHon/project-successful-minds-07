import './App.css';

import { Route, Routes } from 'react-router-dom';

import WelcomePage from '../../pages/WelcomePage/WelcomePage.jsx';

export const App = () => {
  return (
    <Routes>
      <Route path="/welcome" element={<WelcomePage />} />
    </Routes>
  );
};
