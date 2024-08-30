import { BrowserRouter, Routes, Route } from 'react-router-dom';
//import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import WelcomePage from '../../pages/WelcomePage/WelcomePage.jsx';
import './App.css';
//import WaterСonsumptionTracker from '../WaterСonsumptionTracker/WaterСonsumptionTracker.jsx';
//import WhyDrinkWater from '../WhyDrinkWater/WhyDrinkWater.jsx';

function App() {
  return (
    <div>
      {/* <WaterСonsumptionTracker />
      <WhyDrinkWater /> */}
      <WelcomePage />
      <BrowserRouter>
        <Routes>
          <Route path="/welcome" element={<WelcomePage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}
export default App;
