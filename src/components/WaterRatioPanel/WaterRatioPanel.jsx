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
            <span className={css.progressText}>50%</span>
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


// import { useState, useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// // import TodayListModal from "../TodayListModal/TodayListModal.jsx"
// import { CgAdd } from "react-icons/cg";
// import { fetchWaterPerDay } from "../../redux/water/operations.js";
// import { selectWaterPerDay, selectWaterNorma } from "../../redux/water/selectors.js";
// import css from './WaterRatioPanel.module.css';

// const WaterRatioPanel = () => {
//   const dispatch = useDispatch();
//   const dailyWaterRecords = useSelector(selectWaterPerDay);
//   const waterNorm = useSelector(selectWaterNorma);

//   const [consumedWaterPercentage, setConsumedWaterPercentage] = useState(0);
//   const [isModalOpen, setIsModalOpen] = useState(false);

//   // Отримання даних про воду за сьогоднішню дату
//   useEffect(() => {
//     const todayDate = new Date().toLocaleDateString();
//     dispatch(fetchWaterPerDay(todayDate));
//   }, [dispatch]);

//   // Обчислення відсотка спожитої води
//   useEffect(() => {
//     if (dailyWaterRecords && waterNorm) {
//       const totalWaterConsumed = dailyWaterRecords.reduce((total, record) => total + record.amount, 0);
//       const percentageConsumed = Math.min((totalWaterConsumed / waterNorm) * 100, 100);
//       setConsumedWaterPercentage(percentageConsumed);
//     }
//   }, [dailyWaterRecords, waterNorm]);

//   // Обробка відкриття та закриття модального вікна
//   const handleAddWater = () => {
//     setIsModalOpen(true); // Відкриваємо модальне вікно
//   };

//   const closeModal = () => {
//     setIsModalOpen(false); // Закриваємо модальне вікно
//   };

//   return (
//     <div className={css.container}>
//       <h2 className={css.title}>Today</h2>

//       <div className={css.progressBarContainer}>
//         <div className={css.progressBar}>
//           <div className={css.progress} style={{ width: `${consumedWaterPercentage}%` }} />
//           <div className={css.thumb} />
//           <div className={css.progressTextNumber}>
//             <span className={css.progressText}>0%</span>
//             <span className={css.progressTextM}>50%</span>
//             <span className={css.progressText}>100%</span>
//           </div>
//           <div className={css.rangeWaterValue}>
//             {consumedWaterPercentage}%
//           </div>
//         </div>
//         <button className={css.addWaterButton} onClick={handleAddWater}>
//           <CgAdd className={css.icon}/> Add Water
//         </button>
//       </div>

//       {/* Заготовка під модальне вікно */}
//       {isModalOpen && (
//         <div className={css.modalOverlay}>
//           <div className={css.modalContent}>
//             <h3>Add Water Entry</h3>
//             <button onClick={closeModal}>Close</button>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default WaterRatioPanel;

