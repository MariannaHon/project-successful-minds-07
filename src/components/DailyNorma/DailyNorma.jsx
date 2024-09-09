import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import DailyNormaModal from '../DailyNormaModal/DailyNormaModal';
import { selectUser } from '../../redux/auth/selectors';
import { fetchUser } from '../../redux/user/operations';
import css from './DailyNorma.module.css';

const DailyNorma = () => {
    const dispatch = useDispatch();
    const user = useSelector(selectUser);
    const [open, setOpen] = useState(false);
    const [localWaterRate, setLocalWaterRate] = useState(user.waterRate || 2000);

    useEffect(() => {
        if (user._id) {
            dispatch(fetchUser(user._id));
        }
    }, [dispatch, user._id]);

    useEffect(() => {
        setLocalWaterRate(user.waterRate);
    }, [user.waterRate]);

    const handleEditClick = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const convertMillilitersToLiters = (milliliters) => {
        return (milliliters / 1000).toFixed(1);
    };

    const handleUpdateSuccess = (newWaterRate) => {

        if (newWaterRate) {
            setLocalWaterRate(newWaterRate);
        }
        setOpen(false);
    };

    return (
        <div className={css.container}>
            <p className={css.title}>My daily norma</p>
            <div className={css.normaContainer}>
                <span className={css.normaValue}>
                    {localWaterRate ? convertMillilitersToLiters(localWaterRate) : '2.0'} L
                </span>
                <button className={css.editButton} onClick={handleEditClick}>Edit</button>
            </div>
            {open && <DailyNormaModal onClose={handleClose} onUpdateSuccess={handleUpdateSuccess} />}
        </div>
    );
};

export default DailyNorma;
