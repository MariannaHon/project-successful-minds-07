import { useState } from 'react';
import { Helmet } from "react-helmet-async";
import css from "./HomePage.module.css";

import DailyNorma from "../../components/DailyNorma/DailyNorma";
import TodayWaterList from '../../components/TodayWaterList/TodayWaterList.jsx';
import WaterRatioPanel from "../../components/WaterRatioPanel/WaterRatioPanel";
import { nanoid } from '@reduxjs/toolkit';


const HomePage = () => {

  const [waterItems, setWaterItems] = useState([
    {
      id: nanoid(),
      amount: 340,
      date: new Date().toISOString(),
    },
  ]);

  const handleAddWater = (newWater) => {
    setWaterItems([newWater, ...waterItems]); // Додаємо нову воду до початку списку
  };


  return (
    <>
      <Helmet>
        <title>Home page</title>
      </Helmet>
      <div className={css.homePage}>
        <DailyNorma className={css.norma} />
        <div className={css.leftColumn}>
          <WaterRatioPanel handleAddWater={handleAddWater} />
        </div>
        <div className={css.rightColumn}>
          <TodayWaterList waterItems={waterItems} setWaterItems={setWaterItems} handleAddWater={handleAddWater} />
          {/* <MonthStatsTable /> */}
        </div>
      </div>
    </>
  );
};

export default HomePage;
