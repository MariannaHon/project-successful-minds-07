
import { useState } from 'react';
import { HiOutlinePencilSquare } from "react-icons/hi2";
import { RiDeleteBinLine } from "react-icons/ri";
import { CiGlass } from "react-icons/ci";

import css from './TodayWaterList.module.css';

const TodayWaterList = () => {
  const [waterEntries, setWaterEntries] = useState([
    { id: 1, amount: 250, time: '7:00' },
    { id: 2, amount: 220, time: '11:00' },
    { id: 3, amount: 200, time: '14:00' },
    { id: 4, amount: 150, time: '16:00' },
    { id: 5, amount: 150, time: '16:00' },
    { id: 6, amount: 150, time: '16:00' }
  ]);

  const handleEdit = (id) => {
    
  };

  const handleDelete = (id) => {
    setWaterEntries(waterEntries.filter(entry => entry.id !== id));
  };

  return (
    <div className={css.todayWaterList}>
      <h2 className={css.title}>Today</h2>
      <ul className={css.list}>
        {waterEntries.map(entry => (
          <li key={entry.id} className={css.item}>
            {/* <svg className={css.iconGlass} aria-label="icon-glass"><use href="/imgHomePage/Glass.svg#icon-glass"></use></svg> */}
            <div>
              <CiGlass className={css.iconGlass} />
              <span className={css.amount}>{entry.amount} ml</span>
              <span className={css.time}>{entry.time}</span>
            </div>
            <div>
              <button className={css.btn} onClick={() => handleEdit(entry.id)}><HiOutlinePencilSquare className={css.iconPencil}/></button>
              <button className={css.btn} onClick={() => handleDelete(entry.id)}><RiDeleteBinLine className={css.iconDelete}></RiDeleteBinLine></button>
            </div>
            
          </li>
        ))}
      </ul>
      <button className={css.addWaterButton}>+ Add water</button>
    </div>
  );
};

export default TodayWaterList;
