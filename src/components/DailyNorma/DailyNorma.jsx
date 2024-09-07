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

    useEffect(() => {
        if (user.id) {
            dispatch(fetchUser(user.id));
        }
    }, [dispatch, user.id]);

    const handleEditClick = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const convertMillilitersToLiters = (milliliters) => {
        return (milliliters / 1000).toFixed(1);
    };

    const handleUpdateSuccess = () => {
        if (user.id) {
            dispatch(fetchUser(user.id));
        }
    };

    return (
        <div className={css.container}>
            <p className={css.title}>My daily norma</p>
            <div className={css.normaContainer}>
                <span className={css.normaValue}>{user.waterRate ? convertMillilitersToLiters(user.waterRate) : '2.0'} L</span>
                <button className={css.editButton} onClick={handleEditClick}>Edit</button>
            </div>
            {open && <DailyNormaModal onClose={handleClose} onUpdateSuccess={handleUpdateSuccess} />}
        </div>
    );
};

export default DailyNorma;
