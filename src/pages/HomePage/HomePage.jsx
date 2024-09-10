
import { Helmet } from "react-helmet-async";
import css from "./HomePage.module.css";
import { useDispatch, useSelector } from "react-redux";
// import MonthStatsTable from "../../components/MonthStatsTable/MonthStatsTable";
import DailyNorma from "../../components/DailyNorma/DailyNorma";
import TodayWaterList from '../../components/TodayWaterList/TodayWaterList.jsx';
import WaterRatioPanel from "../../components/WaterRatioPanel/WaterRatioPanel";
import { openModal } from "../../redux/modal/modalSlice.js";
import DailyNormaModal from "../../components/DailyNormaModal/DailyNormaModal";
import { selectIsModalOpen } from "../../redux/modal/modalSelectors.js";


const HomePage = () => {
  const dispatch = useDispatch();

  const modalIsOpen = useSelector(selectIsModalOpen);

  const handleOpenModal = () => {
    dispatch(openModal());
  };

  return (
    <>
      <Helmet>
        <title>Home page</title>
      </Helmet>
      <div className={css.homePage}>
        <div className={css.leftColumn}>
          <DailyNorma handleOpenModal={handleOpenModal} />
          <WaterRatioPanel />
        </div>
        <div className={css.rightColumn}>
          <TodayWaterList />
          {/* <MonthStatsTable /> */}
        </div>
      </div>
      {modalIsOpen && <DailyNormaModal />}
    </>
  );
};

export default HomePage;