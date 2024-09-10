import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectCurrentDate, selectWaterPerMonth } from '../../redux/water/selectors.js';
import { fetchWaterPerMonth, fetchWaterPerDay } from '../../redux/water/operations';
import { setActiveDay } from '../../redux/water/slice';
import { formatDateToDayMonthYear } from '../../helpers/formatDateToDayMonthYear.js';
import { convertDateFormatForActiveDay } from '../../helpers/convertDateFormatForActiveDay.js';
import { isDateAfterToday } from '../../helpers/isDateAfterToday.js';
import CalendarItem from '../CalendarItem/CalendarItem';
import css from './Calendar.module.css';
// import { nanoid } from 'nanoid';
import { selectUser } from '../../redux/auth/selectors';
import { fetchUser } from '../../redux/user/operations';

const daysInMonth = (month, year) => {
  return new Date(year, month + 1, 0).getDate();
};

const Calendar = () => {
  const dispatch = useDispatch();

  const currentDate = useSelector(selectCurrentDate);
  console.log(currentDate);
  const user = useSelector(selectUser);
  const waterPerMonth = useSelector(selectWaterPerMonth);
  console.log(waterPerMonth);

  useEffect(() => {
    if (user._id) {
        dispatch(fetchUser(user._id));
    }
}, [dispatch, user._id]);


  // const waterPerMonth = [{
  //   id: nanoid(),
  //   amount: 340,
  //   date: new Date(),
  // }]
  

  // const activeDay = useSelector(state => state.water.activeDay);

  const activeDay = "02.05.2024";

  const calculateFeasibility = dayData => {
    if (!dayData || dayData.length === 0) return 0;

    let totalValue = 0;
    dayData.forEach(record => {
      totalValue += record.amount;
    });

    const userWaterRate = Number(user?.waterNorma) * 1000;

    if (totalValue >= userWaterRate) return 100;

    const feasibility = (totalValue / userWaterRate) * 100;

    return Math.round(feasibility);
  };

  const month = new Date(currentDate).getMonth();
  const year = new Date(currentDate).getFullYear();
  const numberOfDays = daysInMonth(month, year);

  function formatDateForDay(originalDate) {
    const [day, month, year] = originalDate.split('.');
    const formattedDate = `${day}-${month}-${year}`;

    return formattedDate;
  }

  function convertDateFormat(dateString) {
    const [day, month, year] = dateString.split('.');

    return `${day}-${month}-${year}`;
  }

  function findObjectByDate(arr = [], targetDate) {
    return arr.filter(obj => obj.date === targetDate);
  }
  

  const localDate = new Date(currentDate).toLocaleDateString();
  const formattedDateForMonth = formatDateToDayMonthYear(localDate);

  useEffect(() => {
    dispatch(fetchWaterPerMonth(formattedDateForMonth));
    dispatch(fetchWaterPerDay(formattedDateForMonth));
  }, [dispatch, formattedDateForMonth]);

  const daysArray = Array.from({ length: numberOfDays }, (_, index) => index + 1);

  const handleDayClick = day => {
    const formattedDay = `${String(day).padStart(2, '0')}.${String(month + 1).padStart(
      2,
      '0'
    )}.${year}`;


    const formattedDateForDay = formatDateForDay(formattedDay);

    dispatch(setActiveDay(formattedDay));
    dispatch(fetchWaterPerDay(formattedDateForDay));
  };

  const formattedActiveDay = convertDateFormatForActiveDay(activeDay);
 console.log(daysArray);
 
  return (
    <div data-tour="calendar-step" className={css.container}>
      <ul className={css.list}>
        {daysArray.map(day => {
          const dayKey = `${String(day).padStart(2, '0')}.${String(month + 1).padStart(
            2,
            '0'
          )}.${year}`;

          const formattedDayKey = convertDateFormat(dayKey);

          const dayData = findObjectByDate(waterPerMonth, formattedDayKey) || [];
          const feasibility = calculateFeasibility(dayData);

          const isDisabled = isDateAfterToday(dayKey);

          return (
            <li key={day} className={css.item}>
              <CalendarItem
                key={day}
                day={day}
                waterData={dayData}
                feasibility={feasibility}
                onClick={() => handleDayClick(day)}
                isActive={dayKey === formattedActiveDay}
                isDisabled={isDisabled}
              />
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Calendar;