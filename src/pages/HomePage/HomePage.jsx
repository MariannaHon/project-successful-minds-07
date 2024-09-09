
// import { useState } from 'react';
import DailyNorma from '../../components/DailyNorma/DailyNorma.jsx';
import WaterRatioPanel from '../../components/WaterRatioPanel/WaterRatioPanel.jsx';
import TodayWaterList from '../../components/TodayWaterList/TodayWaterList.jsx';
// import Calendar from '../../components/Calendar/Calendar.jsx';
import css from './HomePage.module.css';
const HomePage = () => {
  const progress = 50;

  return (
    <div className={css.homePage}>
      <DailyNorma className={css.norma} />
      <div className={css.leftColumn}>
        <WaterRatioPanel progress={progress} />
      </div>
      <div className={css.rightColumn}>
        <TodayWaterList />
        {/* <Calendar /> */}
      </div>
    </div >
  );
};
export default HomePage;
