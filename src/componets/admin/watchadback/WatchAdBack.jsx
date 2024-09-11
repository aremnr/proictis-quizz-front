import React from 'react';
import Button from '@mui/material/Button';
import styles from './watchadback.module.css';
import { useNavigate } from 'react-router-dom';

export function WatchAdBack() {
    return (
        <div className={styles.puts}>
            <button className={styles.wab}>посмотреть quiz</button><br />
            <button className={styles.wab}>загрузить quiz</button><br />
            <button className={styles.wab}>вернуться в редактор</button><br />
        </div>
    );
};
