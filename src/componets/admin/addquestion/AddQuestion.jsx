import React from 'react';
import Button from '@mui/material/Button';
import styles from './addquestion.module.css';
import { useNavigate } from 'react-router-dom';

export function AddQuestion() {
    return (
        <div className={styles.fieldAdd}>
            <div className={styles.elementsAdd}>
                <p className={styles.AddQuest}>Создание вопросов</p>
                <div className={styles.inputField}>
                    <div className={styles.textField}>
                        <input className={styles.TextField} type="text" value={"введите текст вопроса"} />
                    </div>
                    <div className={styles.picField}>
                        <input className={styles.pic} type="pic" value={"картинка (необязательно)"} />
                    </div>
                    <div className={styles.addAns}>
                        <input className={styles.TextField} type="text" value={"добавить вариант ответа"} />
                    </div>
                    <p className={styles.dopAns}>+ 1 вариант ответа</p>
                    <div className={styles.addButton}>
                        <button className={styles.viewing}>предварительный просмотр</button>
                    </div>
                    <div className={styles.check}>
                        <input type="checkbox" className={styles.customCheckbox} id="last" />
                        <label className={styles.lab} htmlFor="last">это последний вопрос?</label>
                    </div>
                </div>
            </div>
        </div>
    );
};