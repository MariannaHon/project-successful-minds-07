import React, { useState } from 'react'; 
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
        <DailyNorma className={css.norma} />
        <div className={css.leftColumn}>
          <WaterRatioPanel handleAddWater={handleAddWater} />
        </div>
        <div className={css.rightColumn}>
          <TodayWaterList waterItems={waterItems} handleAddWater={handleAddWater} />
          {/* <MonthStatsTable /> */}
        </div>
      </div>
      {modalIsOpen && <DailyNormaModal />}
    </>
  );
};

export default HomePage;

