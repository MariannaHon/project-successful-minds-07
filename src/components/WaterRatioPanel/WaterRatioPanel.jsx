import React from 'react';
import css from './WaterRatioPanel.module.css';

const WaterRatioPanel = ({ progress, onAddWaterClick }) => {
  return (
    <div className={css.container}>
      <h2 className={css.title}>Today</h2>
      <div className={css.progressBarContainer}>
        
        <div className={css.progressBar}>
          
          <div className={css.progress} style={{ width: `${progress}%` }} />
          <div className={css.thumb} style={{ left: `calc(${progress}% - 7px)` }} />
          <div className={css.progressTextNumber}>
            <span className={css.progressText}>0%</span>
            {/* <span className={css.progressText}>50%</span> */}
            <span className={css.progressText}>100%</span>
          </div>
          
        </div>
        
      </div>
      <button className={css.addWaterButton} onClick={onAddWaterClick}>
        <span>
              <svg
                className={css.icon}
                aria-label="icon-plus-circle"
              >
                <use href="../../../public/symbol-defs.svg#icon-plus-circle"></use>
              </svg>
        </span>
        <span> Add Water</span>
      </button>
    </div>
  );
};

export default WaterRatioPanel;