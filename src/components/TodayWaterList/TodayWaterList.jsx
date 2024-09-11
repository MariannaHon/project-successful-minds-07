import { useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useMemo } from "react";
import css from "./TodayWaterList.module.css";
import { CiGlass } from 'react-icons/ci';
import { fetchWaterPerDay } from "../../redux/water/operations.js";
import AddWaterModal from '../AddWaterModal/AddWaterModal.jsx';

import EditModal from '../EditModal/EditModal.jsx';
import {  HiOutlineTrash } from 'react-icons/hi2';

import { selectWatersToday } from '../../redux/water/selectors.js';

import icons from '../../../public/symbol-defsN.svg';


const formatDate = (dateString) => {
  const date = new Date(dateString);
  const options = {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  };

  return new Intl.DateTimeFormat("en-US", options).format(date);
};


export const TodayWaterList = ({ waterItems, setWaterItems, handleAddWater }) => {

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [entryToDelete, setEntryToDelete] = useState(null);

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const handleOpenDelete = (id) => {
    setEntryToDelete(id);
    setIsDeleteModalOpen(true);
  };

  const handleCloseDelete = () => {
    setEntryToDelete(null);
    setIsDeleteModalOpen(false);
  };

  const handleDelete = (_id) => {
    setWaterItems(waterItems.filter((entry) => entry._id !== _id));
    dispatch(fetchWaterPerDay());
    handleCloseDelete();
  };

  const waterToday = useSelector(selectWatersToday);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchWaterPerDay());
  }, [dispatch]);

  useEffect(() => {
    if (waterToday?.records) {
      const formattedItems = waterToday.records.map(item => ({
        ...item,
        date: new Date(item.date).toLocaleString([], {
          hour: '2-digit',
          minute: '2-digit',
          day: '2-digit',
          month: '2-digit',
          year: 'numeric'
        })
      }));
      setWaterItems(formattedItems);
    }
  }, [waterToday, setWaterItems]);

  console.log(waterItems);



  return (
    <div className={css.todayWaterList}>
      <h2 className={css.title}>Today</h2>
      <ul className={css.list}>
        {waterItems.map((entry) => (
          <li key={entry._id} className={css.item}>
            <div className={css.value}>
              <CiGlass className={css.iconGlass} />
              <p className={css.amount}>{entry.amount} ml</p>
              <p className={css.time}>
                {formatDate}
              </p>
            </div>

            <div className={css.btnAll}>
              <EditModal/>           
              <button
                className={css.btnTrash}
                onClick={() => handleOpenDelete(entry.id)}
              >
                <HiOutlineTrash className={css.iconDelete} />
              </button>
            </div>
          </li>
        ))}
      </ul>
      <button className={css.addWaterButton} onClick={toggleModal}>
        + Add water
      </button>

      {isModalOpen && (
        <AddWaterModal
          initialAmount={0}
          onClose={toggleModal}
          updateWaterData={handleAddWater} // Викликаємо функцію додавання води
        />
      )}

      {isDeleteModalOpen && (
        <div className={css.modalOverlay}>
          <div className={css.modalDelete}>
            <svg className={css.crossSvg} onClick={handleCloseDelete}>
              <use href={`${icons}#icon-cross`}></use>
            </svg>
            <div className={css.deleteQuestion}>
              <p className={css.deleteEntry}>Delete entry</p>
              <p className={css.sure}>Are you sure you want to delete the entry?</p>
            </div>
            <div className={css.choiseBtns}>
              <button className={css.btnCancel} onClick={handleCloseDelete}>
                Cancel
              </button>
              <button className={css.btnDel} onClick={handleDelete}>
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TodayWaterList;

