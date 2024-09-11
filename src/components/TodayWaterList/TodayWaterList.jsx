import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import AddWaterModal from '../AddWaterModal/AddWaterModal.jsx';
//import { selectWatersToday } from '../../redux/water/selectors.js';
import { fetchWaterPerDay, deleteWater } from '../../redux/water/operations.js';
import { refreshUser } from '../../redux/auth/operations';
//import EditModal from '../EditModal/EditModal';
import { CiGlass } from 'react-icons/ci';
import { HiOutlinePencilSquare, HiOutlineTrash } from 'react-icons/hi2';
import icons from '../../../public/symbol-defsN.svg';
import css from './TodayWaterList.module.css';

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
				if (Array.isArray(response.records)) {
          setWaterItems(response.records);
        } else {
          console.error('Data is not an array');
        }
				 console.log(response.records);
        // setWaterItems(response.records);
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
              <CiGlass className={css.iconGlass} />
              <p className={css.amount}>{entry.amount} ml</p>
              <p className={css.time}>
                {new Date(entry.time).toLocaleTimeString([], {
                  hour: '2-digit',
                  minute: '2-digit',
                })}
              </p>
            </div>

            <div className={css.btnAll}>
              {/* <EditModal /> */}

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
          updateWaterData={handleAddWater}
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
