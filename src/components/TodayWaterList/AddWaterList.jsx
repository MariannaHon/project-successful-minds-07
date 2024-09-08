import { useState } from 'react';
import css from './TodayWaterList.module.css';
// import icons from '../public/symbol-defsN.svg';
import PropTypes from 'prop-types';

export const EditWaterForm = ({
  onClose,
  initialAmount,
  initialDate,
  updateWaterData,
}) => {
  const [amount, setAmount] = useState(initialAmount);
  const [date, setDate] = useState(initialDate);

  const formatTimeForInput = date => {
    let hours = new Date(date).getHours();
    let minutes = new Date(date).getMinutes();
    hours = hours < 10 ? `0${hours}` : hours;
    minutes = minutes < 10 ? `0${minutes}` : minutes;
    return `${hours}:${minutes}`;
  };

  const handleTimeChange = e => {
    const [hours, minutes] = e.target.value.split(':').map(Number);
    const newDate = new Date(date);
    newDate.setHours(hours);
    newDate.setMinutes(minutes);
    setDate(newDate);
  };

  const formatDate = date => {
    let hours = new Date(date).getHours();
    let minutes = new Date(date).getMinutes();
    return `${hours}:${minutes}`;
  };

  const handleDec = () => {
    setAmount(prev => (prev > 50 ? prev - 50 : 0));
  };

  const handleInc = () => {
    setAmount(amount + 50);
  };

  const handleFormSubmit = e => {
    e.preventDefault();
    updateWaterData(amount, date);
    onClose();
  };

  const handleAmountChange = e => {
    const value = e.target.value;
    setAmount(value === '' ? '' : Number(value));
  };

  return (
    <form className={css.sectionModal} onSubmit={handleFormSubmit}>
      <p className={css.sectionHeader}>Edit the entered amount of water</p>
      <button className={css.crossBtn} type="button" onClick={onClose}>
        <svg>
          <use href="/project-successful-minds-07/symbol-defs.svg#icon-cross"></use>
        </svg>
      </button>
      <div className={css.formEditInfo}>
        <div className={css.waterPreInfo}>
          <svg className={css.svgGlass}>
            <use href="/project-successful-minds-07/symbol-defs.svg#icon-glass"></use>
          </svg>
          <div className={css.timeAmount}>
            <span className={css.waterAmount}>
              {amount ? `${amount} ml` : '0 ml'}
            </span>
            <span className={css.spanTime}>{formatDate(date)}</span>
          </div>
        </div>
        <div className={css.amountCorrection}>
          <p className={css.enteredData}>Correct entered data:</p>
          <p>Amount of water:</p>
          <div className={css.amountCalc}>
            <button
              type="button"
              className={css.amountBtnDec}
              onClick={handleDec}
              disabled={amount === 0}
            >
              <svg>
                <use href="/project-successful-minds-07/symbol-defs.svg#icon-minus"></use>
              </svg>
            </button>
            <p className={css.spanAmount}>{amount ? `${amount} ml` : '0 ml'}</p>
            <button
              type="button"
              className={css.amountBtnInc}
              onClick={handleInc}
              disabled={amount === 5000}
            >
              <svg>
                <use href="/project-successful-minds-07/symbol-defs.svg#icon-plus"></use>
              </svg>
            </button>
          </div>
          <div className={css.inputWrapper}>
            <p>Recording time:</p>
            <input
              type="time"
              value={formatTimeForInput(date)}
              onChange={handleTimeChange}
            />
          </div>
          <div className={css.inputWrapper}>
            <p className={css.numberTopic}>
              Enter the value of the water used:
            </p>
            <input
              type="number"
              name="amount"
              min={0}
              max={5000}
              value={amount === '' ? '' : amount}
              onChange={handleAmountChange}
            />
          </div>
        </div>
      </div>
      <div className={css.saveBtnWrapper}>
        <div className={css.finalAmountSave}>
          <p>{amount === 0 || amount === '' ? '' : `${amount} ml`}</p>
          <button type="submit">Save</button>
        </div>
      </div>
    </form>
  );
};

EditWaterForm.propTypes = {
  onClose: PropTypes.func.isRequired,
  initialAmount: PropTypes.number.isRequired,
  initialDate: PropTypes.instanceOf(Date).isRequired,
  updateWaterData: PropTypes.func.isRequired,
};
