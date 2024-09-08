
// import { nanoid } from "nanoid";
// import { useState } from "react";
// import { WaterEntry } from "./TodayWaterListModal";
// import css from "./TodayWaterList.module.css";
// import icons from "/public/symbol-defsN.svg";
// import { EditWaterForm } from "./AddWaterList";


// import { nanoid } from "nanoid";
// import { useState } from "react";
// import { WaterEntry } from "../TodayListModal/TodayListModal";
// import icons from "/public/symbol-defsN.svg";
// import { EditWaterForm } from "./EditWaterForm";


// import { useState } from 'react';
// import { HiOutlinePencilSquare } from "react-icons/hi2";
// import { RiDeleteBinLine } from "react-icons/ri";
// import { CiGlass } from "react-icons/ci";

// import css from './TodayWaterList.module.css';

// const TodayWaterList = () => {
//   const [waterEntries, setWaterEntries] = useState([
//     { id: 1, amount: 250, time: '7:00' },
//     { id: 2, amount: 220, time: '11:00' },
//     { id: 3, amount: 200, time: '14:00' },
//     { id: 4, amount: 150, time: '16:00' },
//     { id: 5, amount: 150, time: '16:00' },
//     { id: 6, amount: 150, time: '16:00' }
//   ]);

  // const [editingRecord, setEditingRecord] = useState(null);

  // const handleAddWater = () => {
  //   const newWaterItem = {
  //     id: nanoid(),
  //     amount: 250,
  //     date: new Date(),
  //   };
  //   setWaterItems([newWaterItem, ...waterItems]);
  // };

  // const handleDelete = (id) => {
  //   setWaterEntries(waterEntries.filter(entry => entry.id !== id));
  // };

  // const handleEdit = (item) => {
  //   setEditingRecord(item);
  // };

  // const handleEditModalClose = () => {
  //   setEditingRecord(null);
  // };


  // const handleUpdateWater = (updatedAmount, updatedDate) => {
  //   setWaterItems(
  //     waterItems.map((item) =>
  //       item.id === editingRecord.id
  //         ? { ...item, amount: updatedAmount, date: updatedDate }
  //         : item
  //     )
  //   );
  //   handleEditModalClose();
  // };

  // return (
  //   <div className={css.tableWrapper}>
  //     <div className={css.todayWrapper}>
  //       <p className={css.today}>Today</p>
  //       <div className={css.listContainer}>
  //         <div className={css.hightRegulator}>
  //           <ul className={css.listWraper}>
  //             {waterItems.map((elem) => (
  //               <li key={elem.id}>
  //                 <WaterEntry
  //                   initialAmount={elem.amount}
  //                   initialDate={elem.date}
  //                   onDelete={() => handleDelete(elem.id)}
  //                   onEdit={() => handleEdit(elem)}
  //                 />
  //               </li>
  //             ))}
  //           </ul>
  //           <button className={css.addBtn} onClick={handleAddWater}>
  //             <svg>
  //               <use href={`${icons}#icon-plus`}></use>
  //             </svg>
  //             <span>Add water</span>
  //           </button>
  //         </div>
  //       </div>
  //     </div>

  //     {editingRecord && (
  //       <div className={css.modalBackdrop}>
  //         <EditWaterForm
  //           onClose={handleEditModalClose}
  //           initialAmount={editingRecord.amount}
  //           initialDate={editingRecord.date}
  //           updateWaterData={handleUpdateWater}
  //         />
  //       </div>
  //     )}
  //   </div>
  // );
// };


// export default TodayWaterList;

