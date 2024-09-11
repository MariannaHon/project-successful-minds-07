
import DailyNorma from '../../components/DailyNorma/DailyNorma.jsx';
import WaterRatioPanel from '../../components/WaterRatioPanel/WaterRatioPanel.jsx';
import TodayWaterList from '../../components/TodayWaterList/TodayWaterList.jsx';
import MonthInfo from '../../components/MonthInfo/MonthInfo.jsx';
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
        <MonthInfo /> 
      </div>
    </div >
  );
};
export default HomePage;
