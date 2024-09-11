import css from './CalendarItem.module.css';

const CalendarItem = ({ feasibility = 0, day, isActive, onClick, isDisabled }) => {
  const containerStyle = {
    backgroundColor: isActive ? '#272E59' : feasibility < 100 ? 'rgba(50, 63, 71, 0.2)' : '#FFFFFF',
    color: isActive ? '#407BFF' : '#000000',
    cursor: isDisabled ? 'not-allowed' : 'pointer',
    opacity: isDisabled ? 0.5 : 1,
  };

  const handleClick = (event) => {
    onClick(event); 
  };

  return (
    <div className={css.container}>
      <button
        className={css.button}
        style={containerStyle}
        onClick={handleClick}
        disabled={isDisabled}
      >
        {day}
      </button>
      <p className={css.text}>{feasibility}%</p>
    </div>
  );
};

export default CalendarItem;