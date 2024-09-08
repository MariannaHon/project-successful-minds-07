
// import { useState } from 'react';
import DailyNorma from '../../components/DailyNorma/DailyNorma.jsx';
import WaterRatioPanel from '../../components/WaterRatioPanel/WaterRatioPanel.jsx';
// import TodayWaterList from '../../components/TodayWaterList/TodayWaterList.jsx';
// import MonthStatsTable from '../../components/MonthStatsTable/MonthStatsTable.jsx';
import css from './HomePage.module.css';

const HomePage = () => {
  
  return (
    <div className={css.homePage}>
      <div className={css.container}>
        <div className={css.leftColumn}>
        
          <WaterRatioPanel />
        </div>
        <div className={css.rightColumn}>
          {/* <TodayWaterList /> */}
          {/* <MonthStatsTable /> */}
        </div>
      </div>
      <DailyNorma />
    </div>
  );
};

export default HomePage;
