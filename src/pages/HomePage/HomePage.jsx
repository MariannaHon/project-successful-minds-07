import React, { useState } from 'react'; // Додаємо імпорт React та useState
import DailyNorma from '../../components/DailyNorma/DailyNorma.jsx';
import WaterRatioPanel from '../../components/WaterRatioPanel/WaterRatioPanel.jsx';
import TodayWaterList from '../../components/TodayWaterList/TodayWaterList.jsx';
// import Calendar from '../../components/Calendar/Calendar.jsx';
import css from './HomePage.module.css';
import { nanoid } from '@reduxjs/toolkit';

const HomePage = () => {
  const progress = 50;
  const [waterItems, setWaterItems] = useState([
    {
      id: nanoid(),
      amount: 340,
      date: new Date().toISOString(),
    },
  ]);

  // Функція для додавання нового запису
  const handleAddWater = (newWater) => {
    setWaterItems([newWater, ...waterItems]); // Додаємо нову воду до початку списку
  };

  return (
    <div className={css.homePage}>
      <DailyNorma className={css.norma} />
      <div className={css.leftColumn}>
        <WaterRatioPanel progress={progress} handleAddWater={handleAddWater} />
      </div>
      <div className={css.rightColumn}>
        <TodayWaterList waterItems={waterItems} handleAddWater={handleAddWater} />
        {/* <Calendar /> */}
      </div>
    </div>
  );
};

export default HomePage;
