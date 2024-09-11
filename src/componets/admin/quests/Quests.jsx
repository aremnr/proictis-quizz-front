import React from 'react';
import Button from '@mui/material/Button';
import styles from './quests.module.css';
import { useNavigate } from 'react-router-dom';

export function Quests() {
    return (
        <div className = {styles.bg}>
        <div className = {styles.containerquests}>
        <div className={styles.tenQuests}>
            <div className={styles.fiveQuests}>
                <button className={styles.tenQ}>вопрос 1</button>
                <button className={styles.tenQ}>вопрос 2</button>
                <button className={styles.tenQ}>вопрос 3</button>
                <button className={styles.tenQ}>вопрос 4</button>
                <button className={styles.tenQ}>вопрос 5</button>
            </div>
            <div className={styles.fiveQuests}>
                <button className={styles.answer}>вопрос 6</button>
                <button className={styles.tenQ}>вопрос 7</button>
                <button className={styles.tenQ}>вопрос 8</button>
                <button className={styles.tenQ}>вопрос 9</button>
                <button className={styles.tenQ}>вопрос 10</button>
                <button className={styles.backBut}>Вернуться в редактор</button>
            </div>
            </div>
        </div>
        </div>
    );
};
