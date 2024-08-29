import { WaterСonsumptionTracker } from '../../components/WaterСonsumptionTracker/WaterСonsumptionTracker.jsx';

import { WhyDrinkWater } from '../../components/WhyDrinkWater/WhyDrinkWater.jsx';
import css from './WelcomePage.module.css';
const WelcomePage = () => {
  return (
    <div className={css.welcomePage}>
      <WaterСonsumptionTracker />

      <WhyDrinkWater />
    </div>
  );
};

export default WelcomePage;
