import { useEffect, useRef, useState } from 'react';

const DaysGeneralStats = ({ selectedDay, dailyNorm, normCompletion, servings, targetElement }) => {
    const [position, setPosition] = useState({ top: 0, left: 0 });
    const popupRef = useRef(null);

    useEffect(() => {
        if (targetElement) {
            const rect = targetElement.getBoundingClientRect();
            setPosition({
                top: rect.top,
                left: rect.left
            });
        }
    }, [targetElement]);

    return (
        <div
            ref={popupRef}
            style={{
                ...styles.popup,
                top: position.top,
                left: position.left,
                transform: 'translate(-100%, -100%)'
            }}
        >
            <div style={styles.statsItem}>
                <strong>{selectedDay}</strong>
            </div>
            <div style={styles.statsItem}>
                <span>Daily norm:</span> <strong>{dailyNorm} </strong>
            </div>
            <div style={styles.statsItem}>
                <span>Fulfillment of the daily norm:</span> <strong>{normCompletion}</strong>
            </div>
            <div style={styles.statsItem}>
                <span>Number of water servings:</span> <strong>{servings}</strong>
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
        width: '200px',
    },
    statsItem: {
        marginBottom: '10px',
    }
    
};

export default DaysGeneralStats;