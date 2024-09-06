import { useState } from 'react';
import { useSelector } from 'react-redux';
import DailyNormaModal from '../DailyNormaModal/DailyNormaModal';
import { selectUser } from '../../redux/auth/selectors';
import css from './DailyNorma.module.css';

const DailyNorma = () => {
    const { dailyNorma } = useSelector(selectUser); // Отримуємо дані про воду з Redux
    const [open, setOpen] = useState(false);

    const handleEditClick = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <div className={css.container}>
            <p className={css.title}>My daily norma</p>
            <div className={css.normaContainer}>
                <span className={css.normaValue}>{dailyNorma || '2.0'} L</span> {/* Виводимо глобальне значення */}
                <button className={css.editButton} onClick={handleEditClick}>Edit</button>
            </div>
            {open && <DailyNormaModal onClose={handleClose} />} {/* Відкриваємо модалку */}
        </div>
    );
};

export default DailyNorma;
