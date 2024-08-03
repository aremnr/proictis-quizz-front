import styles from './answer.module.css';
import React from 'react';
import Button from '@mui/material/Button';


export function Answer () {
    return(
      <div>
      <div className={styles.outercontainer2}>
          <div className={styles.innercontainer2}>
              <div className={styles.elements}>
                  <p className={styles.question}>Кто проживает на дне океана?</p>
              <div className={styles.questPhoto}>
                  <img className={styles.photo} src="/gubka.jpg" alt="Gubka" />
                  <p className={styles.Rightanswer}>Верный ответ:</p>
              </div>
              
              <div className={styles.answers}>
                  <button className={styles.answerRight}>Спанч Боб</button>
                  <button className={styles.answerWrong}>Хлебная жаба</button>
                  <button className={styles.answerWrong}>Что?</button>
                  <button className={styles.answerWrong}>Улитка</button>
              </div>
              
              </div>
          </div>
      </div>
  </div>
    );
}
