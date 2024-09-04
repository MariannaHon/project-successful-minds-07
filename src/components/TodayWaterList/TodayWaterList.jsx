/* eslint-disable react/prop-types */
// import React from 'react';
import { HiOutlinePencilSquare } from "react-icons/hi2";
import css from './TodayWaterList.module.css';

const TodayWaterList = ({ waterEntries, onEdit, onDelete }) => {

  // // Стан для водних записів
  // const [waterEntries, setWaterEntries] = useState([
  //   { amount: 250, time: '7:00' },
  //   { amount: 220, time: '11:00' },
  //   { amount: 200, time: '14:00' },
  // ]);

  // const handleEdit = (index) => {
  //   console.log('Edit entry at index:', index);
  // };

  // const handleDelete = (index) => {
  //   setWaterEntries((prevEntries) => 
  //     prevEntries.filter((_, i) => i !== index)
  //   );
  // };
  return (
    <div className={css.container}>
      <h2 className={css.title}>Today</h2>
      <ul className={css.list}>
        {waterEntries.map((entry, index) => (
          <li key={index} className={css.listItem}>
            <div className={css.entry}>
              <div className={css.entryText}>
                <span className={css.waterAmount}>{entry.amount} ml</span>
                <span className={css.time}>{entry.time}</span>
              </div>
              <div className={css.actions}>
                <button onClick={() => onEdit(index)} className={css.editButton}>
                  <HiOutlinePencilSquare />
                  {/* <svg className={css.icon} aria-label="icon-edit">
                    <use href="../../../public/symbol-defs.svg#icon-edit"></use>
                  </svg> */}
                </button>
                <button onClick={() => onDelete(index)} className={css.deleteButton}>
                  <svg className={css.icon} aria-label="icon-delete">
                    <use href="../../../public/symbol-defs.svg#icon-trash"></use>
                  </svg>
                </button>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodayWaterList;
