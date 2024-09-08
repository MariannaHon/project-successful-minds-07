import { nanoid } from 'nanoid';
import { useState } from 'react';
import { HiOutlinePencilSquare, HiOutlineTrash } from "react-icons/hi2";
// import { RiDeleteBinLine } from "react-icons/ri";
import { CiGlass } from "react-icons/ci";

import css from './TodayWaterList.module.css';
import { EditWaterForm } from './AddWaterList';

export const TodayWaterList = () => {
  const [waterItems, setWaterItems] = useState([
    {
      id: nanoid(),
      amount: 340,
      date: new Date(),
    },
  ]);

  const [editingRecord, setEditingRecord] = useState(null);

  const handleAddWater = () => {
    const newWaterItem = {
      id: nanoid(),
      amount: 250,
      date: new Date(),
    };
    setWaterItems([newWaterItem, ...waterItems]);
  };

  const handleDelete = id => {
    setWaterItems(waterItems.filter(elem => elem.id !== id));
  };

  const handleEdit = item => {
    setEditingRecord(item);
  };

  const handleEditModalClose = () => {
    setEditingRecord(null);
  };

  const handleUpdateWater = (updatedAmount, updatedDate) => {
    setWaterItems(
      waterItems.map(item =>
        item.id === editingRecord.id
          ? { ...item, amount: updatedAmount, date: updatedDate }
          : item
      )
    );
    handleEditModalClose();
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
              <button className={css.btnPencil} onClick={() => handleEdit(entry.id)}><HiOutlinePencilSquare className={css.iconPencil}/></button>
              <button className={css.btnTrash} onClick={() => handleDelete(entry.id)}><HiOutlineTrash className={css.iconDelete}/></button>
            </div>
            
          </li>
        ))}
      </ul>
      <button className={css.addWaterButton}>+ Add water</button>
    </div>
  );
};

export default TodayWaterList;



// import { useEffect } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { fetchWaterPerDay } from '../../redux/operations';
// import { selectWaterPerDayArr } from '../../redux/selectors';
// import { HiOutlinePencilSquare, HiOutlineTrash } from "react-icons/hi2";
// import { CiGlass } from "react-icons/ci";
// import css from './TodayWaterList.module.css';

// const TodayWaterList = () => {
//   const dispatch = useDispatch();
//   const waterEntries = useSelector(selectWaterPerDayArr); 

//     useEffect(() => {
//     const todayDate = new Date().toLocaleDateString(); 
//     dispatch(fetchWaterPerDay(todayDate)); 
//   }, [dispatch]);

//     return (
//     <div className={css.todayWaterList}>
//       <h2 className={css.title}>Today</h2>
//       <ul className={css.list}>
//         {waterEntries && waterEntries.map(entry => (
//           <li key={entry.id} className={css.item}>
//             <div className={css.value}>
//               <CiGlass className={css.iconGlass} />
//               <p className={css.amount}>{entry.amount} ml</p>
//               <p className={css.time}>{entry.time}</p>
//             </div>
//             <div className={css.btnAll}>
//               <button className={css.btn}><HiOutlinePencilSquare className={css.iconPencil}/></button>
//               <button className={css.btn}><HiOutlineTrash className={css.iconDelete}/></button>
//             </div>
//           </li>
//         ))}
//       </ul>
//       <button className={css.addWaterButton}>+ Add water</button>
//     </div>
//   );
// };

// export default TodayWaterList;
