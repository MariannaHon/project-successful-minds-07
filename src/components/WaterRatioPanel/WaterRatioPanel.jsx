/* eslint-disable react/prop-types */
import { useState } from 'react';
import { CgAdd } from "react-icons/cg";
import css from './WaterRatioPanel.module.css';
import {EditWaterForm} from "../TodayWaterList/AddWaterList.jsx";

const WaterRatioPanel = ({ progress, handleAddWater }) => {
  // Створюємо стан для відображення модального вікна
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Функція для відкриття/закриття модального вікна
  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  // Функція для оновлення даних про воду
  const updateWaterData = (amount, date) => {
    console.log(`Amount: ${amount}, Date: ${date}`);
    // Тут ви можете передавати оновлені дані у батьківський компонент або API
    setIsModalOpen(false); // Закриваємо модальне вікно після збереження
  };

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
        <button className={css.addWaterButton} onClick={toggleModal}>
          <CgAdd className={css.icon} /> Add Water
        </button>
      </div>

      {/* Відображаємо модальне вікно, тільки якщо isModalOpen === true */}
      {isModalOpen && (
        <div className={css.modalOverlay}>
          <div className={css.modalContent}>
            <EditWaterForm 
              initialAmount={0} // Ви можете передати початкові значення
              initialDate={new Date()}
              updateWaterData={updateWaterData}
              onClose={toggleModal} // Закрити модальне вікно
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default WaterRatioPanel;
