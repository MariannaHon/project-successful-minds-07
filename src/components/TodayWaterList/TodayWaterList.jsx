
import { useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useMemo } from "react";
import css from "./TodayWaterList.module.css";
import { CiGlass } from 'react-icons/ci';
import { fetchWaterPerDay } from "../../redux/water/operations.js";
import AddWaterModal from '../AddWaterModal/AddWaterModal.jsx';

import { selectWatersToday } from '../../redux/water/selectors.js';



import { HiOutlinePencilSquare, HiOutlineTrash } from 'react-icons/hi2';
import icons from '../../../public/symbol-defsN.svg';


export const TodayWaterList = ({ waterItems, setWaterItems, handleAddWater }) => {

  console.log(waterItems);

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
    handleCloseDelete();
  };

  const waterToday = useSelector(selectWatersToday);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchWaterPerDay());
  }, [dispatch]);

  const entries = useMemo(
    () => waterToday?.records || [],
    [waterToday]
  );


  return (
    <div className={css.todayWaterList}>
      <h2 className={css.title}>Today</h2>
      <ul className={css.list}>
        {entries.map((entry) => (
          <li key={entry._id} className={css.item}>
            <div className={css.value}>
              <CiGlass className={css.iconGlass} />
              <p className={css.amount}>{entry.amount} ml</p>
              <p className={css.time}>
                {new Date(entry.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </p>
            </div>
            <div className={css.btnAll}>
              <button className={css.btnPencil}>
                <HiOutlinePencilSquare className={css.iconPencil} />
              </button>
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


