import { useEffect, useState } from "react";
import moment from "moment";
// import { useWaters } from "../../hooks/userWaters";

const useGenerateDataArray = (selectedMonth, monthWater) => {
  const [dataArray, setDataArray] = useState([]);

  useEffect(() => {
    const generateDataArray = () => {
      const daysInMonth = selectedMonth.daysInMonth();
      const dataArray = [];

      for (let i = 1; i <= daysInMonth; i++) {
        const date = selectedMonth.clone().date(i).toISOString();
        const dataObject = {
          date: date,
          dailyNorma: 0,
          percentDailyNorm: 0,
          consumptionCount: 0,
        };

        const matchedObject = monthWater?.find((item) => {
          return moment(item.date).isSame(date, "day");
        });

        if (matchedObject) {
          dataObject.dailyNorma = matchedObject.dailyNorm;
          dataObject.percentDailyNorm = matchedObject.percentDailyNorm;
          dataObject.consumptionCount = matchedObject.consumptionCount;
        }

        dataArray.push(dataObject);
      }

      return dataArray;
    };

    setDataArray(generateDataArray());
  }, [selectedMonth, monthWater]);

  return dataArray;
};

export default useGenerateDataArray;
