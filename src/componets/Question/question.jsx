import React from 'react';

import { Timer } from '../Timer/Timer';
import Button from '@mui/material/Button';
import styles from './questionstyle.module.css';

export function Question () {
    return(
        <div>
            <div className={styles.outerContainer}>
                <div className={styles.innerContainer}>
                    <div className={styles.elements}>
                        <p className={styles.question}>Кто проживает на дне океана?</p>
                    <div className={styles.questPhoto}>
                        <img className={styles.photo} src="/gubka.jpg" alt="Gubka" />
                    </div>
                    <div className={styles.timerpadding}><Timer seconds={60} /></div>
                    <div className={styles.answers}>
                        <input className={styles.inputText} type="text" placeholder="ваш ответ" />
                    </div>
                    <div className={styles.button1}>
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
    );
}
