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
          <div className={css.progressText}>0%</div>
          <div className={css.centerMark}>50%</div>
          <div className={css.progressText}>100%</div>
        </div>
        
      </div>
      <button className={css.addWaterButton} onClick={onAddWaterClick}>
        <span className={css.addWaterIcon}>+</span> Add Water
      </button>
    </div>
  );
};

export default WaterRatioPanel;