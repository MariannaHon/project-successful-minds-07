import WaterСonsumptionTracker from '../../components/WaterСonsumptionTracker/WaterСonsumptionTracker.jsx';

import WhyDrinkWater from '../../components/WhyDrinkWater/WhyDrinkWater.jsx';
import styles from './WelcomePage.module.css';
const WelcomePage = () => {
  return (
    <div className={styles.welcomePage}>
      <div className={styles.welcomePageContainer}>
        <div className={styles.welcomePageContainerBlock}>
          <WaterСonsumptionTracker />
          <WhyDrinkWater />
        </div>
      </div>
    </div>
  );
};

export default WelcomePage;
