import { Field, Form, Formik, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { addWater } from "../../redux/water/operations";
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { IoClose } from 'react-icons/io5';
import { RxMinus, RxPlus } from 'react-icons/rx';
import css from "./AddWaterModal.module.css";
import moment from "moment";
import toast from 'react-hot-toast';
import { nanoid } from "@reduxjs/toolkit";

// Оновлена схема валідації для часу у форматі HH:mm
const WaterSchema = Yup.object().shape({
    date: Yup.string()
        .matches(/^([01]\d|2[0-3]):([0-5]\d)$/, "Invalid time format! Use HH:mm.")
        .required("Required field!"),
    waterVolume: Yup.number()
        .min(1, "Too little! Min 1 ml")
        .max(5000, "Too much! Max 5000 ml")
        .required("Required field!"),
});

const AddWaterModal = ({ initialAmount = 50, onClose, updateWaterData }) => {
    const dispatch = useDispatch();
    const [amountOfWater, setAmountOfWater] = useState(initialAmount);

    const incrementOfCounter = 50;

    const addAmount = () => setAmountOfWater(amountOfWater + incrementOfCounter);
    const withdrawAmount = () => {
        if (amountOfWater >= incrementOfCounter) {
            setAmountOfWater(amountOfWater - incrementOfCounter);
        }
    };

    const getCurrentTime = () => {
        const now = new Date();
        const hours = now.getHours().toString().padStart(2, '0');
        const minutes = now.getMinutes().toString().padStart(2, '0');
        return `${hours}:${minutes}`;
    };

    const timeNow = getCurrentTime();

    // Форматуємо дату і час у формат YYYY-MM-DD HH:mm
    const formatDateTime = (date, time) => {
        return moment(`${date} ${time}`, "YYYY-MM-DD HH:mm").format("YYYY-MM-DD HH:mm");
    };

    const handleAddWater = (values, actions) => {
        const date = moment().format("YYYY-MM-DD"); // Текуча дата
        const formattedDateTime = formatDateTime(date, values.date);
        const waterVolume = values.waterVolume;

        dispatch(addWater({ localTime: formattedDateTime, waterValue: waterVolume }))
            .unwrap()
            .then(() => {
                actions.resetForm();
                onClose(); // Закриття модального вікна
                setAmountOfWater(50); // Скидання кількості води
                toast.success('Water data added successfully!');
                updateWaterData({
                    id: nanoid(), // Додаємо новий id для водного запису
                    amount: waterVolume,
                    date: formattedDateTime
                });
            })
            .catch((error) => {
                console.error("Failed to add water:", error);
                toast.error('Error while saving water data.');
            });
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

                    <Formik
                        initialValues={{ date: timeNow, waterVolume: initialAmount }}
                        onSubmit={handleAddWater}
                        validationSchema={WaterSchema}
                    >
                        {({ setFieldValue }) => (
                            <Form className={css.formContainer}>
                                <label className={css.formTitle}>Choose a value:</label>
                                <div className={css.inputGroup}>
                                    <button
                                        className={css.buttonAddWater}
                                        onClick={() => {
                                            withdrawAmount();
                                            if (amountOfWater > 0) {
                                                setFieldValue(
                                                    "waterVolume",
                                                    amountOfWater - incrementOfCounter
                                                );
                                            }
                                        }}
                                        type="button"
                                    >
                                        <RxMinus className={css.addWaterIcon} />
                                    </button>
                                    <input
                                        className={css.inputWater}
                                        type="text"
                                        value={`${amountOfWater} ml`}
                                        readOnly
                                    />
                                    <button
                                        className={css.buttonAddWater}
                                        onClick={() => {
                                            addAmount();
                                            setFieldValue(
                                                "waterVolume",
                                                amountOfWater + incrementOfCounter
                                            );
                                        }}
                                        type="button"
                                    >
                                        <RxPlus className={css.addWaterIcon} />
                                    </button>
                                </div>

                                <div className={css.timeContainer}>
                                    <label>Recording time:</label>
                                    <Field
                                        name="date"
                                        type="text"
                                        className={css.input}
                                        placeholder="Enter time (HH:mm)"
                                    />
                                    <ErrorMessage
                                        className={css.error}
                                        name="date"
                                        component="span"
                                    />
                                </div>

                                <div className={css.editWaterContainer}>
                                    <label>Enter the value of the water used:</label>
                                    <Field
                                        className={css.input}
                                        name="waterVolume"
                                        type="number"
                                        min="0"
                                        onFocus={() => setFieldValue("waterVolume", "")}
                                        onBlur={(e) => {
                                            setAmountOfWater(Number(e.target.value));
                                            if (e.target.value === "") {
                                                setFieldValue("waterVolume", "0");
                                            }
                                        }}
                                    />
                                    <ErrorMessage
                                        className={css.error}
                                        name="waterVolume"
                                        component="span"
                                    />
                                </div>

                                <div className={css.saveContainer}>
                                    {amountOfWater} ml
                                    <button className={css.saveBtn} type="submit">
                                        Save
                                    </button>
                                </div>
                            </Form>
                        )}
                    </Formik>
                </div>
            </Box>
        </Modal>
    );
};

export default AddWaterModal;



