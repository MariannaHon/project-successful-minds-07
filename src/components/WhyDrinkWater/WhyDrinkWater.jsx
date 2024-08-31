import css from './WhyDrinkWater.module.css';
import { VscCircleFilled } from 'react-icons/vsc';
const WhyDrinkWater = () => {
  return (
    <div className={css.whyDrinkWaterBlockTwo}>
      <ul className={css.whyDrinkWaterContainer}>
        <li className={css.waterItem}>
          <h3 className={css.WaterHeader}>Why drink water</h3>
        </li>

        <li className={css.waterItem}>
          <span className={css.myIconSpan}>
            <VscCircleFilled size="14" />
          </span>
          Supply of nutrients to all organs
        </li>
        <li className={css.waterItem}>
          <span className={css.myIconSpan}>
            <VscCircleFilled size="14" />
          </span>
          Providing oxygen to the lungs
        </li>
        <li className={css.waterItem}>
          <span className={css.myIconSpan}>
            <VscCircleFilled size="14" />
          </span>
          Maintaining the work of the heart
        </li>
        <li className={css.waterItem}>
          <span className={css.myIconSpan}>
            <VscCircleFilled size="14" />
          </span>
          Release of processed substances
        </li>
        <li className={css.waterItem}>
          <span className={css.myIconSpan}>
            <VscCircleFilled size="14" />
          </span>
          Ensuring the stability of the internal environment
        </li>
        <li className={css.waterItem}>
          <span className={css.myIconSpan}>
            <VscCircleFilled size="14" />
          </span>
          <span>Maintaining within the normal temperature</span>
        </li>
        <li className={css.waterItem}>
          <span className={css.myIconSpan}>
            <VscCircleFilled size="14" />
          </span>
          <span>Maintaining an immune system capable of resisting disease</span>
        </li>
      </ul>
    </div>
  );
};

export default WhyDrinkWater;
