//import React from 'react';

//import { useSelector, useDispatch } from 'react-redux';

import { useNavigate } from 'react-router-dom';

import styles from './WaterConsumptionTracker.module.css';

const WaterСonsumptionTracker = () => {
  const navigate = useNavigate();

  const handleTryTrackerClick = () => {
    navigate('/signup'); // Використовуємо navigate для переходу
  };
  return (
    <div className={styles.waterСonsumptionTrackerBlockOne}>
      <h1 className={styles.waterСonsumptionTrackerHeader}>
        Water consumption tracker
      </h1>

      <h2 className={styles.waterСonsumptionTrackerSubheader}>
        Record daily water intake and track your progress
      </h2>

      <h3 className={styles.waterСonsumptionTrackerBlockOneTitle}>
        Tracker Benefits
      </h3>

      <ul className={styles.waterСonsumptionTrackerContainer}>
        <li className={styles.waterСonsumptionTrackerItem}>
          <span>
            <svg
              className={styles.iconCalendarDays}
              width="40"
              height="40"
              aria-label="icon-calendar-days"
            >
              <use href="../../../public/symbol-defs.svg#icon-calendar-days"></use>
            </svg>
          </span>

          <span>Habit drive</span>
        </li>

        <li className={styles.waterСonsumptionTrackerItem}>
          <span>
            <svg
              className={styles.iconPresentationChartBar}
              width="40"
              height="40"
              aria-label="icon-presentation-chart-bar"
            >
              <use href="../../../public/symbol-defs.svg#icon-presentation-chart-bar"></use>
            </svg>
          </span>

          <span>View statistics</span>
        </li>

        <li className={styles.waterСonsumptionTrackerItem}>
          <span>
            <svg
              className={styles.iconWrenchScrewdriver}
              width="40"
              height="40"
              aria-label="icon-wrench-screwdriver"
            >
              <use href="../../../public/symbol-defs.svg#icon-wrench-screwdriver"></use>
            </svg>
          </span>

          <span>Personal rate setting</span>
        </li>
      </ul>
      <button
        type="button"
        className={styles.button}
        onClick={handleTryTrackerClick}
      >
        Try tracker
      </button>
    </div>
  );
};

export default WaterСonsumptionTracker;
