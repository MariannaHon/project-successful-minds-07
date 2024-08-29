import { useNavigate } from 'react-router-dom';

import css from './WaterСonsumptionTracker.module.css';

const WaterСonsumptionTracker = () => {
  const navigate = useNavigate();

  const handleTryTrackerClick = () => {
    navigate('/signup');
  };
  return (
    <div className={css.waterСonsumptionTrackerBlockOne}>
      <h1 className={css.waterСonsumptionTrackerHeader}>
        Water consumption tracker
      </h1>

      <h2 className={css.waterСonsumptionTrackerSubheader}>
        Record daily water intake and track your progress
      </h2>

      <h3 className={css.waterСonsumptionTrackerBlockOneTitle}>
        Tracker Benefits
      </h3>

      <ul className={css.waterСonsumptionTrackerContainer}>
        <li className={css.waterСonsumptionTrackerItem}>
          <span>
            <svg
              className={css.iconCalendarDays}
              width="40"
              height="40"
              aria-label="icon-calendar-days"
            >
              <use href="../../../public/symbol-defs.svg#icon-calendar-days"></use>
            </svg>
          </span>

          <span>Habit drive</span>
        </li>

        <li className={css.waterСonsumptionTrackerItem}>
          <span>
            <svg
              className={css.iconPresentationChartBar}
              width="40"
              height="40"
              aria-label="icon-presentation-chart-bar"
            >
              <use href="../../../public/symbol-defs.svg#icon-presentation-chart-bar"></use>
            </svg>
          </span>

          <span>View statistics</span>
        </li>

        <li className={css.waterСonsumptionTrackerItem}>
          <span>
            <svg
              className={css.iconWrenchScrewdriver}
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
        className={css.button}
        onClick={handleTryTrackerClick}
      >
        Try tracker
      </button>
    </div>
  );
};

export default WaterСonsumptionTracker;
