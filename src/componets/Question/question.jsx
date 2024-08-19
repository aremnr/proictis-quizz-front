import React from 'react';
import { Timer } from '../Timer/Timer';
import Button from '@mui/material/Button';
import styles from './questionstyle.module.css';
import mockQuestions from '../../mocks/mocks';
import {useParams} from 'react-router-dom';


export function Question () {
    const { id } = useParams();
    const questionIndex = parseInt(id, 10) - 1; // Преобразуем ID в индекс массива
    const currentQuestion = mockQuestions[questionIndex];

    if (!currentQuestion) {
        return <p>Вопрос не найден.</p>;
    }
    return(
        <div>
            <div className={styles.bgimage}>
            <div className={styles.outerContainer2}>
                <div className={styles.innerContainer2}>
                    <div className={styles.elements}>
                        <p className={styles.question}>{currentQuestion.question}</p>
                        <div className={styles.questPhoto}>
                            <img className={styles.photo} src="/gubka.jpg" alt="Gubka" />
                        </div>
                        <div className={styles.timerpadding}><Timer seconds={60} /></div>
                        <div className={styles.answers2}>
                            <input className={styles.inputText} type="text" placeholder="ваш ответ" />
                        </div>
                        <div>
                        <Button
                            variant="contained"
                            color="secondary"
                            className={styles.toAnswer}>
                                ответить
                        </Button>
                        </div>
                    </div>
                </div>
            </div>
            </div>
        </div>
    );
}
