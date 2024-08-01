import { LinearProgress } from '@mui/material';
import { useEffect, useState } from 'react'

import styles from './timer.module.css';

export const Timer = ({ seconds }) => {
  const [progress, setProgress] = useState(0);

  const multiplier = 100 / seconds;
  const currentTime = `${seconds - Math.round(progress / multiplier)} c`;

  useEffect(() => {
      const timer = setInterval(() => {
        setProgress((prevProgress) => (prevProgress >= 100 ? 0 : prevProgress + multiplier));
      }, 1000);
      return () => {
        clearInterval(timer);
      };
  }, [multiplier]);

  return (
    <div className={styles.timerWrppaer}>
      <LinearProgress
        color="secondary"
        variant="determinate"
        className={styles.progress}
        value={progress}
        classes={{
          bar: styles.bar,
        }}
      />
      <div className={styles.label}>
        {currentTime}
      </div>
    </div>
  )
}
