import { useEffect, useRef, useState } from 'react';
import css from './DaysGeneralStats.module.css';

const DaysGeneralStats = ({
  selectedDay,
  dailyNorm,
  normCompletion,
  servings,
  targetElement,
}) => {
  const [position, setPosition] = useState({ top: 0, left: 0 });
  const popupRef = useRef(null);
  const [isLargeScreen, setIsLargeScreen] = useState(false);

  useEffect(() => {
    const checkScreenSize = () => {
      setIsLargeScreen(window.innerWidth > 1440);
    };

    checkScreenSize();

    window.addEventListener('resize', checkScreenSize);

    return () => {
      window.removeEventListener('resize', checkScreenSize);
    };
  }, []);

  useEffect(() => {
    if (targetElement) {
      const rect = targetElement.getBoundingClientRect();
      setPosition({
        top: rect.top,
        left: rect.left,
      });
    }
  }, [targetElement]);

  return (
    <div
      ref={popupRef}
      style={{
        ...styles.popup,
        top: '50%',
        left: '50%',
        transform: isLargeScreen
          ? 'translate(-50%, -50%)'
          : 'translate(-50%, 300%)',
        width: '285px',
      }}
    >
      <div style={styles.statsItem}>
        <strong className={css.strong}>{selectedDay}</strong>
      </div>
      <div style={styles.statsItem}>
        <span className={css.span}>Daily norm:</span>{' '}
        <strong className={css.strong}>{dailyNorm} </strong>
      </div>
      <div style={styles.statsItem}>
        <span className={css.span}>Fulfillment of the daily norm:</span>{' '}
        <strong className={css.strong}>{normCompletion}</strong>
      </div>
      <div style={styles.statsItem}>
        <span className={css.span}>Number of water servings:</span>{' '}
        <strong className={css.strong}>{servings}</strong>
      </div>
    </div>
  );
};

const styles = {
  popup: {
    position: 'absolute',
    backgroundColor: '#ffffff',
    padding: '15px',
    borderRadius: '10px',
    boxShadow: '0px 4px 4px 0px #407BFF4D',
    zIndex: 10,
    width: '280px',
  },
  statsItem: {
    marginBottom: '10px',
  },
};

export default DaysGeneralStats;
