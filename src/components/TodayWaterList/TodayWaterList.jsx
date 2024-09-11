import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import css from './TodayWaterList.module.css';
// import { CiGlass } from 'react-icons/ci';
import { fetchWaterPerDay } from '../../redux/water/operations.js';
import AddWaterModal from '../AddWaterModal/AddWaterModal.jsx';
//import TodayListModal from '../TodayListModal/TodayListModal.jsx';
import { deleteWater } from '../../redux/water/operations.js';
import { HiOutlinePencilSquare, HiOutlineTrash } from 'react-icons/hi2';
import icons from '../../../public/symbol-defsN.svg';
import { refreshUser } from '../../redux/auth/operations';

export const TodayWaterList = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [entryToDelete, setEntryToDelete] = useState(null);
  const [waterItems, setWaterItems] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await dispatch(fetchWaterPerDay()).unwrap();
        setWaterItems(response.records);
      } catch (err) {
        console.error('Failed to fetch water data:', err);
      }
    };

    fetchData();
  }, [dispatch]);

  const handleAddWater = newWater => {
    setWaterItems([newWater, ...waterItems]);
    dispatch(refreshUser());
  };

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const handleOpenDelete = id => {
    if (id) {
      setEntryToDelete(id);
      setIsDeleteModalOpen(true);
    } else {
      console.error('Invalid ID: ', id);
    }
  };

  const handleCloseDelete = () => {
    setEntryToDelete(null);
    setIsDeleteModalOpen(false);
  };

  const confirmDelete = async () => {
    try {
      if (!entryToDelete) {
        throw new Error('Invalid ID');
      }
      await dispatch(deleteWater(entryToDelete)).unwrap();
      setWaterItems(prevItems =>
        prevItems.filter(entry => entry._id !== entryToDelete)
      );
      setIsDeleteModalOpen(false);
    } catch (err) {
      console.error(err);
    }
  };

  const sortedWaterItems = waterItems
    .slice()
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

  return (
    <div className={css.todayWaterList}>
      <h2 className={css.title}>Today</h2>
      <ul className={css.list}>
        {sortedWaterItems.map(entry => (
          <li key={entry._id} className={css.item}>
            <div className={css.value}>
               <svg className={css.iconGlass} aria-label="icon-glass"><use href="/project-successful-minds-07/symbol-defsN.svg#icon-glass"></use></svg>
              <p className={css.amount}>{entry.amount} ml</p>
              <p className={css.time}>
                {new Date(entry.time).toLocaleTimeString([], {
                  hour: '2-digit',
                  minute: '2-digit',
                })}
              </p>
            </div>
            <div className={css.btnAll}>
              <button className={css.btnPencil}>
                <HiOutlinePencilSquare className={css.iconPencil} />
              </button>
              <button
                className={css.btnTrash}
                onClick={() => handleOpenDelete(entry._id)}
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

      {/*  Render modal for editing water entries */}
      {/* {editingRecord && (
        <div className={css.modalBackdrop}>
          <TodayListModal
            onClose={handleEditModalClose}
            initialAmount={editingRecord.amount}
            initialTime={editingRecord.time}
           // updateWaterData={handleUpdateWater}
          />
        </div>
      )} */}

      {isDeleteModalOpen && (
        <div className={css.modalOverlay}>
          <div className={css.modalDelete}>
            <svg className={css.crossSvg} onClick={handleCloseDelete}>
              <use href={`${icons}#icon-cross`}></use>
            </svg>
            <div className={css.deleteQuestion}>
              <p className={css.deleteEntry}>Delete entry</p>
              <p className={css.sure}>
                Are you sure you want to delete the entry?
              </p>
            </div>
            <div className={css.choiseBtns}>
              <button className={css.btnCancel} onClick={handleCloseDelete}>
                Cancel
              </button>
              <button className={css.btnDel} onClick={confirmDelete}>
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
