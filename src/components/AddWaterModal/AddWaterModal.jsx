import { useState } from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { IoClose } from 'react-icons/io5';
import { RxMinus, RxPlus } from 'react-icons/rx';
import css from './AddWaterModal.module.css';
import { useDispatch } from 'react-redux';
import { addWater } from '../../redux/water/operations';
import toast from 'react-hot-toast';
import { formatDateForAddOrEditWater } from '../../helpers/formatDateForAddOrEditWater'; // Імпортуємо функцію

const AddWaterModal = ({ initialAmount, initialDate, onClose }) => {
    const [amount, setAmount] = useState(initialAmount);
    const [time, setTime] = useState(initialDate ? initialDate.toTimeString().slice(0, 5) : '');
    const [manualAmount, setManualAmount] = useState(initialAmount);

    const dispatch = useDispatch();

    // Збільшення кількості води
    const incrementAmount = (e) => {
        e.preventDefault();
        const newAmount = amount + 10;
        setAmount(newAmount);
        setManualAmount(newAmount);
    };

    // Зменшення кількості води
    const decrementAmount = (e) => {
        e.preventDefault();
        const newAmount = Math.max(0, amount - 10); // Захист від негативного значення
        setAmount(newAmount);
        setManualAmount(newAmount);
    };

    // Оновлення введеного часу
    const handleTimeChange = (e) => {
        setTime(e.target.value);
    };

    // Оновлення введеної кількості води вручну
    const handleManualAmountChange = (e) => {
        const value = e.target.value;
        if (value === '') {
            setManualAmount(0);
            setAmount(0); // Скидання також для відображення
        } else {
            const numberValue = Number(value);
            if (!isNaN(numberValue) && numberValue >= 0) {
                setManualAmount(numberValue);
                setAmount(numberValue); // Оновлення також для відображення
            }
        }
    };


    // Обробка натискання кнопки "Save"
    const handleSave = async (e) => {
        e.preventDefault();

        if (!time) {
            toast.error('Please enter a valid time.');
            return;
        }

        try {
            toast.dismiss();

            if (!(initialDate instanceof Date)) {
                throw new Error('Initial date is not a valid Date object.');
            }

            // Форматування дати і часу
            const formattedDate = formatDateForAddOrEditWater(initialDate);
            const formattedDateTime = `${formattedDate} ${time}`;

            await dispatch(addWater({
                localTime: formattedDateTime,
                waterValue: manualAmount
            })).unwrap();

            toast.success('Water data added successfully!');
            onClose();
        } catch (error) {
            toast.error(error.message || 'Error while saving water data.');
        }
    };



    return (
        <Modal open={true} onClose={onClose}>
            <Box className={css.modalStyle}>
                <div className={css.modalContainer}>
                    <div className={css.addCloseContainer}>
                        <h2 className={css.title}>Add water</h2>
                        <button className={css.iconClose} onClick={onClose}>
                            <IoClose />
                        </button>
                    </div>
                    <form className={css.formContainer} onSubmit={handleSave}>
                        <label className={css.formTitle}>Choose a value:</label>
                        <div className={css.inputGroup}>
                            <button className={css.buttonAddWater} onClick={decrementAmount}>
                                <RxMinus className={css.addWaterIcon} />
                            </button>
                            <input
                                className={css.inputWater}
                                type="text"
                                value={`${amount} ml`}
                                readOnly
                            />
                            <button className={css.buttonAddWater} onClick={incrementAmount}>
                                <RxPlus className={css.addWaterIcon} />
                            </button>
                        </div>

                        <div className={css.timeContainer}>
                            <label>Recording time:</label>
                            <input
                                type="text"
                                value={time}
                                onChange={handleTimeChange}
                                placeholder="HH:MM"
                                maxLength={5}
                            />
                        </div>

                        <div className={css.editWaterContainer}>
                            <label>Enter the value of the water used:</label>
                            <input
                                type="number"
                                value={manualAmount === 0 ? '' : manualAmount}
                                onChange={handleManualAmountChange}
                                placeholder="0"
                            />
                        </div>
                        <div className={css.saveContainer}>
                            {amount} ml
                            <button className={css.saveBtn} type="submit">
                                Save
                            </button>

                        </div>
                    </form>
                </div>
            </Box>
        </Modal>
    );
};

export default AddWaterModal;
