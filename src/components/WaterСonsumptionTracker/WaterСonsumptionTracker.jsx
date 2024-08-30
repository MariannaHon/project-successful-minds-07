import styles from './WaterСonsumptionTracker.module.css';
import { Navigate } from 'react-router-dom';
const WaterСonsumptionTracker = () => {
  const handleTryTrackerClick = () => {
    return <Navigate to="/signup" replace />;
  };
  return (
    <div className={styles.waterСonsumptionTrackerBlockOne}>
      <div className={styles.welcomePageContainer}>
        <h1 className={styles.waterСonsumptionTrackerHeader}>
          Water consumption tracker
        </h1>

        <h2 className={styles.waterСonsumptionTrackerSubheader}>
          Record daily water intake and track
        </h2>

        <h3 className={styles.WaterHeader}>Tracker Benefits</h3>

        <ul className={styles.waterСonsumptionTrackerContainer}>
          <li className={styles.waterItem}>
            <span>
              <svg
                className={styles.iconBar}
                width="40"
                height="40"
                aria-label="icon-calendar-days"
              >
                <use href="../../../public/symbol-defs.svg#icon-calendar-days"></use>
              </svg>
            </span>

            <span className={styles.spanText}>Habit drive</span>
          </li>

          <li className={styles.waterItem}>
            <span>
              <svg
                className={styles.iconBar}
                width="40"
                height="40"
                aria-label="icon-presentation-chart-bar"
              >
                <use href="../../../public/symbol-defs.svg#icon-presentation-chart-bar"></use>
              </svg>
            </span>

            <span className={styles.spanText}>View statistics</span>
          </li>

          <li className={styles.waterItem}>
            <span>
              <svg
                className={styles.iconBar}
                width="40"
                height="40"
                aria-label="icon-wrench-screwdriver"
              >
                <use href="../../../public/symbol-defs.svg#icon-wrench-screwdriver"></use>
              </svg>
            </span>{' '}
            <span className={styles.spanText}>Personal rate setting</span>
          </li>
        </ul>
        <button
          type="button"
          className={styles.WaterСonsumptionTrackerButton}
          onClick={handleTryTrackerClick}
        >
          Try tracker
        </button>
      </div>
    </div>
  );
};

export default WaterСonsumptionTracker;
