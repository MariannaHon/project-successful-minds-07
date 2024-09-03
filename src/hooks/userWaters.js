import { useSelector } from "react-redux";
import {
  selectLoading,
  selectMonthWater,
  selectTodayWater,
  selectTodayWaterID,
} from "../redux/water/selectors";

export const useWaters = () => {
  const loading = useSelector(selectLoading);
  const todayWater = useSelector(selectTodayWater);
  const idForEditDeleteWater = useSelector(selectTodayWaterID);
  const monthWater = useSelector(selectMonthWater);

  return {
    loading,
    todayWater,
    idForEditDeleteWater,
    monthWater,
  };
};
