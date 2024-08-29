//import React from 'react';

//import { useSelector, useDispatch } from 'react-redux';

//import { useNavigate } from 'react-router-dom';

import styles from './WaterConsumptionTracker.module.css';

const WaterСonsumptionTracker = () => {
  return (
    <div className={styles.waterСonsumptionTracker}>
      <h1 className={styles.waterСonsumptionTrackerHeader}>
        Water consumption tracker
      </h1>

      <h2 className={styles.waterСonsumptionTrackerSubheader}>
        Record daily water intake and track your progress
      </h2>

      <div className={styles.waterСonsumptionTrackerBlockOne}>
        <h3 className={styles.waterСonsumptionTrackerBlockOneTitle}>
          Tracker Benefits
        </h3>

        <ul className={styles.waterСonsumptionTrackerContainer}>
          <li className={styles.waterСonsumptionTrackerItem}>
            <span>&#128204;</span>

            <span>Habit drive</span>
          </li>

          <li className={styles.waterСonsumptionTrackerItem}>
            <span>&#128200;</span>

            <span>View statistics</span>
          </li>

          <li className={styles.waterСonsumptionTrackerItem}>
            <span>&#128100;</span>

            <span>Personal rate setting</span>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default WaterСonsumptionTracker;
