import { useState } from 'react';
import { HiOutlinePencilSquare, HiOutlineTrash } from "react-icons/hi2";
// import { RiDeleteBinLine } from "react-icons/ri";
import { CiGlass } from "react-icons/ci";
// import { EditWaterForm } from './AddWaterList';
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
    setWaterEntries(waterEntries.filter(entry => entry.id !== id));
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
            <div className={css.value}>
              <CiGlass className={css.iconGlass} />
              <p className={css.amount}>{entry.amount} ml</p>
              <p className={css.time}>{entry.time}</p>
            </div>
            <div className={css.btnAll}>
              <button className={css.btnPencil} onClick={() => handleEdit(entry.id)}><HiOutlinePencilSquare className={css.iconPencil} /></button>
              {/* <EditWaterForm /> */}
              <button className={css.btnTrash} onClick={() => handleDelete(entry.id)}><HiOutlineTrash className={css.iconDelete} /></button>
            </div>

          </li>
        ))}
      </ul>
      <button className={css.addWaterButton}>+ Add water</button>
    </div>
  );
};

export default TodayWaterList;
