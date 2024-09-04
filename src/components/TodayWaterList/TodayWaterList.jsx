// /* eslint-disable react/prop-types */
// // import React from 'react';
// import css from './TodayWaterList.module.css';

// const TodayWaterList = () => {

//   // // Стан для водних записів
//   // const [waterEntries, setWaterEntries] = useState([
//   //   { amount: 250, time: '7:00' },
//   //   { amount: 220, time: '11:00' },
//   //   { amount: 200, time: '14:00' },
//   // ]);

//   // const handleEdit = (index) => {
//   //   console.log('Edit entry at index:', index);
//   // };

//   // const handleDelete = (index) => {
//   //   setWaterEntries((prevEntries) =>
//   //     prevEntries.filter((_, i) => i !== index)
//   //   );
//   // };
//   return (
//     <div className={css.container}>
//       <h2 className={css.title}>Today</h2>
//       <ul className={css.list}>
//         {waterEntries.map((entry, index) => (
//           <li key={index} className={css.listItem}>
//             <div className={css.entry}>
//               <div className={css.entryText}>
//                 <span className={css.waterAmount}>{entry.amount} ml</span>
//                 <span className={css.time}>{entry.time}</span>
//               </div>
//               <div className={css.actions}>
//                 <button onClick={() => onEdit(index)} className={css.editButton}>
//                   <HiOutlinePencilSquare />
//                   {/* <svg className={css.icon} aria-label="icon-edit">
//                     <use href="../../../public/symbol-defs.svg#icon-edit"></use>
//                   </svg> */}
//                 </button>
//                 <button onClick={() => onDelete(index)} className={css.deleteButton}>
//                   <svg className={css.icon} aria-label="icon-delete">
//                     <use href="../../../public/symbol-defs.svg#icon-trash"></use>
//                   </svg>
//                 </button>
//               </div>
//             </div>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default TodayWaterList;






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
            <CiGlass className={css.iconGlass}/>
            <span className={css.amount}>{entry.amount} ml</span>
            <span className={css.time}>{entry.time}</span>
            <button className={css.btn} onClick={() => handleEdit(entry.id)}><HiOutlinePencilSquare className={css.iconPencil}/></button>
            <button className={css.btn} onClick={() => handleDelete(entry.id)}><RiDeleteBinLine className={css.iconDelete}></RiDeleteBinLine></button>
          </li>
        ))}
      </ul>
      <button className={css.addWaterButton}>+ Add water</button>
    </div>
  );
};

export default TodayWaterList;

