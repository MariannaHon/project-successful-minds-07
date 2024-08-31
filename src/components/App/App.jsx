import './App.css';
import { Route, Routes } from 'react-router-dom';
import SignInPage from '../../pages/SigninPage/SigninPage';
import NotFound from '../../pages/NotFound/NotFound'
function App() {
  console.log('-------------APP');

  return (
    <>
      <Routes>
        {/* <Route path="/" element={<Home />} /> */}
        <Route path="/signin" element={<SignInPage />} />
         {/* <Route path="/signup" element={<SignUpPage />} />  */}
         <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;
