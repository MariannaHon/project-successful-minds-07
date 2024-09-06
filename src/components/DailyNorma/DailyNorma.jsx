import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import DailyNormaModal from '../DailyNormaModal/DailyNormaModal';
import { selectUser } from '../../redux/auth/selectors';
import { fetchUser } from '../../redux/user/operations'; // Імпортуємо fetchUser
import css from './DailyNorma.module.css';

const DailyNorma = () => {
    const dispatch = useDispatch();
    const user = useSelector(selectUser); // Отримуємо дані про користувача з Redux
    const [open, setOpen] = useState(false);

    // Викликаємо fetchUser для отримання даних користувача з бекенду
    useEffect(() => {
        if (user.id) {
            dispatch(fetchUser(user.id)); // Передаємо ID користувача для отримання його даних
        }
    }, [dispatch, user.id]);

    const handleEditClick = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    // Функція для конвертації мілілітрів у літри
    const convertMillilitersToLiters = (milliliters) => {
        return (milliliters / 1000).toFixed(1); // Конвертація з округленням до 1 знака після коми
    };

    return (
        <div className={css.container}>
            <p className={css.title}>My daily norma</p>
            <div className={css.normaContainer}>
                {/* Перевіряємо, якщо waterRate існує, то конвертуємо його з мілілітрів у літри */}
                <span className={css.normaValue}>{user.waterRate ? convertMillilitersToLiters(user.waterRate) : '2.0'} L</span>
                <button className={css.editButton} onClick={handleEditClick}>Edit</button>
            </div>
            {open && <DailyNormaModal onClose={handleClose} />} {/* Відкриваємо модалку */}
        </div>
    );
};

export default DailyNorma;
