import { LinearProgress } from '@mui/material';
import { useEffect, useState } from 'react';
import styles from './timer.module.css';

export const Timer = ({ seconds, onTimerEnd }) => {
  const [progress, setProgress] = useState(0);
  const [currentTime, setCurrentTime] = useState(seconds);

  const multiplier = 100 / seconds;

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prevProgress) => {
        const newProgress = prevProgress >= 100 ? 100 : prevProgress + multiplier;
        const newTime = seconds - Math.round(newProgress / multiplier);
        setCurrentTime(newTime);

        if (newProgress >= 100) {
          clearInterval(timer); // Останавливаем таймер
          onTimerEnd(); // Вызываем функцию, когда таймер завершен
        }

        return newProgress;
      });
    }, 1000);
    
    return () => {
      clearInterval(timer);
    };
  }, [multiplier, seconds, onTimerEnd]);

  return (
    <div className={styles.timerWrapper}>
      <LinearProgress
        color="secondary"
        variant="determinate"
        className={styles.progress}
        value={progress}
        classes={{
          bar: styles.bar,
        }}
      />
      <div className={`${styles.label} ${currentTime < 10 ? styles.blink : ''}`}>
        {currentTime} c
      </div>
    </div>
  );
};
