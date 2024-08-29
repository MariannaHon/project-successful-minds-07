import styles from './WhyDrinkWater.module.css';

const WhyDrinkWater = () => {
  return (
    <div className={styles.whyDrinkWaterBlockTwo}>
      <h3 className={styles.whyDrinkWaterHeader}>Why drink water</h3>

      <ul className={styles.whyDrinkWaterContainer}>
        <li className={styles.whyDrinkWaterItem}>
          Supply of nutrients to all organs
        </li>

        <li className={styles.whyDrinkWaterItem}>
          Providing oxygen to the lungs
        </li>

        <li className={styles.whyDrinkWaterItem}>
          Maintaining the work of the heart
        </li>

        <li className={styles.whyDrinkWaterItem}>
          Release of processed substances
        </li>

        <li className={styles.whyDrinkWaterItem}>
          Ensuring the stability of the internal environment
        </li>

        <li className={styles.whyDrinkWaterItem}>
          Maintaining within the normal temperature
        </li>

        <li className={styles.whyDrinkWaterItem}>
          Maintaining an immune system capable of resisting disease
        </li>
      </ul>
    </div>
  );
};

export default WhyDrinkWater;
