
import { useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useMemo } from "react";
import TodayWaterItem from "./TodayWaterItem";
import css from "./TodayWaterList.module.css";
import { FaPlus as Plus } from "react-icons/fa6";
import { selectWatersToday } from "../../redux/water/selectors.js";
import { fetchWaterPerDay } from "../../redux/water/operations.js";
// import AddWaterList from "./AddWaterList.jsx";
// import DeleteWater from "./DeleteWater.jsx";



// import { HiOutlinePencilSquare, HiOutlineTrash } from 'react-icons/hi2';
// import { CiGlass } from 'react-icons/ci';
// import { AddWaterList } from './AddWaterList';
// import { TodayListModal } from '../TodayListModal/TodayListModal';
// import icons from '../../../public/symbol-defsN.svg';



// const [waterItems, setWaterItems] = useState([
//   {
//     id: nanoid(),
//     amount: 340,
//     date: new Date(),
//   },
// ]);

// const [editingRecord, setEditingRecord] = useState(null);

// const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false); // State to manage delete modal
// const [entryToDelete, setEntryToDelete] = useState(null); // Entry to be deleted

// const handleAddWater = () => {
//   const newWaterItem = {
//     id: nanoid(),
//     amount: 250,
//     date: new Date(),
//   };
//   setWaterItems([newWaterItem, ...waterItems]);
// };


// // Open the delete modal
// const handleOpenDelete = id => {
//   setEntryToDelete(id);
//   setIsDeleteModalOpen(true);
// };

// // Close the delete modal
// const handleCloseDelete = () => {
//   setEntryToDelete(null);
//   setIsDeleteModalOpen(false);
// };

// // Confirm delete
// const handleDelete = () => {
//   setWaterItems(waterItems.filter(entry => entry.id !== entryToDelete));
//   handleCloseDelete();
// };

const formatTime = (isoDateString) => {
  const date = new Date(isoDateString);
  const options = {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  };

  return new Intl.DateTimeFormat("en-US", options).format(date);
};

export const TodayWaterList = () => {

  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const dispatch = useDispatch();
  const waterToday = useSelector(selectWatersToday);

  useEffect(() => {
    dispatch(fetchWaterPerDay());
  }, [dispatch]);

  const entries = useMemo(
    () => waterToday?.todayWaterNotesList || [],
    [waterToday]
  );

  return (
    <div className={css.todayWaterList}>
      <h2 className={css.title}>Today</h2>
      {entries.length === 0 ? (
        <p className={css.noNotes}>No notes yet</p>
      ) : (
        <ul className={css.list}>
          {entries.map(({ _id, waterVolume, date }) => (
            <TodayWaterItem
              key={_id}
              id={_id}
              waterVolume={waterVolume}
              date={formatTime(date)}
            />
          ))}
        </ul>
      )}
      <button
        className={css.addWaterButton}
        onClick={toggleModal}
      >
        <Plus className={css.plus} /> Add water
      </button>
      {/* <AddWaterList />
        <DeleteWater /> */}
    </div>
  );
};



//   return (
//     <div className={css.todayWaterList}>
//       <h2 className={css.title}>Today</h2>
//       <ul className={css.list}>
//         {waterItems.map(entry => (
//           <li key={entry.id} className={css.item}>
//             <div className={css.value}>
//               <CiGlass className={css.iconGlass} />
//               <p className={css.amount}>{entry.amount} ml</p>
//               <p className={css.time}>{entry.time}</p>
//             </div>
//             <div className={css.btnAll}>
//               <button
//                 className={css.btnPencil}

//                 onClick={() => handleEdit(entry)}
//               >
//                 <HiOutlinePencilSquare className={css.iconPencil} />
//               </button>
//               <button
//                 className={css.btnTrash}
//                 onClick={() => handleOpenDelete(entry.id)}
//               >
//                 <HiOutlineTrash className={css.iconDelete} />
//               </button>
//             </div>
//           </li>
//         ))}
//       </ul>
//       <button className={css.addWaterButton} onClick={toggleModal}>
//         + Add water
//       </button>

//       {/*  Render modal for editing water entries */}
//       {editingRecord && (
//         <div className={css.modalBackdrop}>
//           <TodayListModal
//             onClose={handleEditModalClose}
//             initialAmount={editingRecord.amount}
//             initialTime={editingRecord.time}
//             updateWaterData={handleUpdateWater}
//           />
//         </div>
//       )}

//       {/* Render delete confirmation modal */}
//       {isDeleteModalOpen && (
//         <div className={css.modalOverlay}>
//           <div className={css.modalDelete}>
//             <svg className={css.crossSvg} onClick={handleCloseDelete}>
//               <use href={`${icons}#icon-cross`}></use>
//             </svg>
//             <div className={css.deleteQuestion}>
//               <p className={css.deleteEntry}>Delete entry</p>
//               <p className={css.sure}>
//                 Are you sure you want to delete the entry?
//               </p>
//             </div>
//             <div className={css.choiseBtns}>
//               <button className={css.btnCancel} onClick={handleCloseDelete}>
//                 Cancel
//               </button>
//               <button className={css.btnDel} onClick={handleDelete}>
//                 Delete
//               </button>
//             </div>
//           </div>
//         </div>
//       )}

//       {isModalOpen && (
//         <div className={css.modalOverlay}>
//           <div className={css.modalContent}>
//             <AddWaterList
//               initialAmount={0} // Ви можете передати початкові значення
//               // initialDate={new Date()}
//               // value={formatTimeForInput(date)}
//               onClose={toggleModal} // Закрити модальне вікно
//               updateWaterData={handleAddWater}
//             // onChange={handleTimeChange}
//             />
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

export default TodayWaterList;





