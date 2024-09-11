import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectCurrentDate, selectWaterPerMonth, selectActiveDay } from '../../redux/water/selectors';
import { fetchWaterPerMonth } from '../../redux/water/operations';
import { setActiveDay } from '../../redux/water/slice';
import { convertDateFormatForActiveDay } from '../../helpers/convertDateFormatForActiveDay';
import { isDateAfterToday } from '../../helpers/isDateAfterToday';
import CalendarItem from '../CalendarItem/CalendarItem';
import DaysGeneralStats from '../DaysGeneralStats/DaysGeneralStats';
import css from './Calendar.module.css';
import moment from 'moment';

const daysInMonth = (month, year) => {
    return new Date(year, month, 0).getDate();
};

const Calendar = () => {
    const dispatch = useDispatch();

    const waterPerMonth = useSelector(selectWaterPerMonth);
    const currentDate = useSelector(selectCurrentDate);
    const activeDay = useSelector(selectActiveDay);

    const [selectedDateElement, setSelectedDateElement] = useState(null);

    const momentDate = moment(currentDate);
    const month = momentDate.format('M');
    const year = momentDate.format('YYYY');

    useEffect(() => {
        dispatch(fetchWaterPerMonth({ month, year }));
    }, [dispatch, month, year]);

    const calculateFeasibility = consumedPercentage => {
        return Math.round(Number(consumedPercentage?.replace('%', '')));
    };

    const numberOfDays = daysInMonth(month, year);

    function convertDateFormat(dateString) {
        const date = moment(dateString, 'DD.MM.YYYY');
        return date.format('D, MMMM');
    }

    function findObjectByDate(arr = [], targetDate) {
        const result = arr.find(obj => obj.date === targetDate);
        return result ? result : { date: targetDate, value: 0 };
    }

    const daysArray = Array.from({ length: numberOfDays }, (_, index) => index + 1);

    const handleDayClick = (event, day) => {
      if (!event) {
          console.error('Event is undefined');
          return;
      }
      
      const formattedDay = `${String(day).padStart(2, '0')}.${String(month).padStart(2, '0')}.${year}`;
      setSelectedDateElement(event.currentTarget);
      dispatch(setActiveDay(formattedDay));
  };

    const formattedActiveDay = convertDateFormatForActiveDay(activeDay);

    const activeDayData = findObjectByDate(waterPerMonth, formattedActiveDay);

    return (
        <div data-tour="calendar-step" className={css.calendarContainer}>
            <ul className={css.calendarList}>
                {daysArray.map(day => {
                    const dayKey = `${String(day).padStart(2, '0')}.${String(month).padStart(2, '0')}.${year}`;
                    const formattedDayKey = convertDateFormat(dayKey);

                    const dayData = findObjectByDate(waterPerMonth, formattedDayKey) || {};
                    const feasibility = calculateFeasibility(dayData.consumedPercentage);

                    const isDisabled = isDateAfterToday(dayKey);

                    return (
                        <li key={day} className={css.calendarItem}>
                            <CalendarItem
                                day={day}
                                waterData={dayData}
                                feasibility={feasibility}
                                onClick={(event) => handleDayClick(event, day)}
                                isActive={dayKey === formattedActiveDay}
                                isDisabled={isDisabled}
                            />
                        </li>
                    );
                })}
            </ul>

            {activeDay && activeDayData && (
                <DaysGeneralStats
                    selectedDay={formattedActiveDay}
                    dailyNorm={activeDayData.dailyWaterRate}
                    normCompletion={activeDayData.consumedPercentage}
                    servings={activeDayData.consumptionCount}
                    targetElement={selectedDateElement} // Передаємо елемент для позиціювання
                />
            )}
        </div>
    );
};

export default Calendar;