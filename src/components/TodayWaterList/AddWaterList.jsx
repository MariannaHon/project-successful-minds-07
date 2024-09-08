import { useState } from "react";
import css from "./TodayWaterList.module.css";
import icons from "/public/symbol-defsN.svg";

export const EditWaterForm = ({ onClose, initialAmount, initialDate, updateWaterData }) => {
  const [amount, setAmount] = useState(initialAmount);
  const [date, setDate] = useState(initialDate ? new Date(initialDate) : new Date());

  const formatTimeForInput = (date) => {
    if (!(date instanceof Date) || isNaN(date.getTime())) return "";
    let hours = date.getHours();
    let minutes = date.getMinutes();
    hours = hours < 10 ? `0${hours}` : hours;
    minutes = minutes < 10 ? `0${minutes}` : minutes;
    return `${hours}:${minutes}`;
  };

  const handleTimeChange = (e) => {
    const [hours, minutes] = e.target.value.split(':').map(Number);
    const newDate = new Date(date);
    newDate.setHours(hours);
    newDate.setMinutes(minutes);
    setDate(newDate);
  };

  const formatDate = (date) => {
    if (!(date instanceof Date) || isNaN(date.getTime())) return "Invalid Date";
    let hours = date.getHours();
    let minutes = date.getMinutes();
    return hours + ':' + minutes;
    return `${hours}:${minutes < 10 ? `0${minutes}` : minutes}`;
  };

  const handleDec = () => {
    setAmount((prev) => (prev > 50 ? prev - 50 : 0));
  };

  const handleInc = () => {
    setAmount(amount + 50);
    setAmount((prev) => (prev < 5000 ? prev + 50 : 5000));
  };

  const handleChange = (e) => {
    setAmount(Number(e.target.value));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    updateWaterData(amount, date);
    onClose();
  };

  return (
    <form className={css.section} onSubmit={handleSubmit}>
      <p className={css.sectionHeader}>Edit the entered amount of water</p>
      <button className={css.crossBtn} onClick={onClose}>
        <svg>
          <use href={`${icons}#icon-cross`}></use>
        </svg>
      </button>
      <div className={css.inputWrapper}>
        <div className={css.inputGroup}>
          <p className={css.numberTopic}>Amount of water:</p>
          <button type="button" onClick={handleDec}>-</button>
          <input
            type="number"
            value={amount}
            onChange={handleChange}
            min={0}
            max={5000}
          />
          <button type="button" onClick={handleInc}>+</button>
        </div>
        <div className={css.inputWrapper}>
          <p className={css.numberTopic}>Enter the time:</p>
          <input
            type="time"
            value={formatTimeForInput(date)}
            onChange={handleTimeChange}
          />
        </div>
      </div>
      <button type="submit">Save</button>
    </form>
  );
};
