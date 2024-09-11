import { CircularProgress } from '@mui/material';
import { useEffect, useState } from 'react';
import styles from './timer.module.css';

export const Timer = ({ seconds, onTimerEnd }) => {
  const [progress, setProgress] = useState(100); // Установить значение 100 для полного заполнения круга
  const [currentTime, setCurrentTime] = useState(seconds);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prevProgress) => {
        const newProgress = prevProgress - 100 / seconds; // Уменьшение прогресса для таймера обратного отсчета
        const newTime = seconds - Math.round((100 - newProgress) * (seconds / 100));
        setCurrentTime(newTime);

        if (newProgress <= 0) {
          clearInterval(timer);
          onTimerEnd();
        }

        return newProgress;
      });
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, [seconds, onTimerEnd]);

  return (
    <div className={styles.timerWrapper}>
      <CircularProgress
        variant="determinate"
        value={progress}
        className={styles.progress}
        size={70}
        thickness={22}
        sx={{
          color: '#FF00C7', // Цвет круга
        }}
      />
      <div className={`${styles.label} ${currentTime < 10 ? styles.blink : ''}`}>
        {currentTime} 
      </div>
    </div>
  );
};
