
import { useDispatch, useSelector } from "react-redux";
import css from "./TodayWaterItem.module.css";
import { HiOutlinePencilSquare as Edit } from "react-icons/hi2";
import { HiOutlineTrash as Trash } from "react-icons/hi2";
import { CiGlass } from 'react-icons/ci';
import TodayListModal from "../TodayListModal/TodayListModal";
import {
    editWater,
    deleteEntry,
} from "../../redux/modal/modalSlice.js";
import { selectIdToEdit } from "../../redux/modal/modalSelectors.js";

const TodayWaterItem = ({ id, waterVolume, date }) => {
    const dispatch = useDispatch();
    const idToEdit = useSelector(selectIdToEdit);

    const handleDelete = () => {
        dispatch(deleteEntry(id));
    };

    const handleEdit = () => {
        dispatch(editWater(id));
    };

    return (
        <li key={id} className={css.entryItem}>
            <div className={css.entryInfo}>
                <CiGlass className={css.glass} />
                <p className={css.amount}>{waterVolume} ml</p>
                <p className={css.time}>{date}</p>
            </div>
            <div className={css.icons}>
                <button className={css.edit} onClick={handleEdit}>
                    <Edit className={css.edit} size={16} />
                </button>
                <button className={css.delete} onClick={handleDelete}>
                    <Trash className={css.delete} size={16} />
                </button>
            </div>
            {idToEdit === id && (
                <TodayListModal waterVolume={waterVolume} date={date} />
            )}

        </li>
    );
};

export default TodayWaterItem;