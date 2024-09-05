/* eslint-disable react/prop-types */
// import {useState} from 'react';
import { CgAdd } from "react-icons/cg";
// import TodayListModal from "../TodayListModal/TodayListModal.jsx";
import css from './WaterRatioPanel.module.css';

const WaterRatioPanel = ({ progress, handleAddWater }) => {
  //  const [isModalOpen, setIsModalOpen] = useState(false);
  
  return (
    <div className={css.container}>
      
      <h2 className={css.title}>Today</h2>
      <div className={css.progressBarContainer}>
        
        <div className={css.progressBar}>
          
          <div className={css.progress} style={{ width: `${progress}%` }} />
          <div className={css.thumb} style={{ left: `calc(${progress}% - 7px)` }} />
 
          <div className={css.marks}>
            <span className={css.mark} style={{ left: '0%' }} />
            <span className={css.mark} style={{ left: '50%' }} />
            <span className={css.mark} style={{ left: '100%' }} />
          </div>

          <div className={css.progressTextNumber}>
            <span className={css.progressText}>0%</span>
            <span className={css.progressTextM}>50%</span>
            <span className={css.progressText}>100%</span>
          </div>
          
        </div>
        <button className={css.addWaterButton} onClick={handleAddWater}>
        <CgAdd className={css.icon}/> Add Water
      </button>
      </div>
      
      
      {/* <TodayListModal
                onClose={() => setIsModalOpen(false)}
                isOpen={isModalOpen}
            /> */}
    </div>
   
  );
};

export default WaterRatioPanel;

