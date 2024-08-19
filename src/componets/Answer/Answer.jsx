import styles from './answer.module.css';
import React, { useState } from 'react';
import Button from '@mui/material/Button';
import mockQuestions from '../../mocks/mocks';
import { useParams } from 'react-router-dom';


export function Answer() {
    const { id } = useParams(); // Получаем параметр id из URL
    const questionId = parseInt(id, 10); // Преобразуем id в число
    const currentQuestion = mockQuestions.find(q => q.id === questionId);
  
    if (!currentQuestion) {
      return <p>Вопрос не найден</p>; // Если вопрос с таким id не найден
    }
  
    return (
      <div className={styles.bgimage}>
        <div className={styles.outercontainer2}>
          <div className={styles.innercontainer2}>
            <div className={styles.elements}>
              <p className={styles.question}>{currentQuestion.question}</p>
              <div className={styles.questPhoto}>
                <img className={styles.photo} src="/gubka.jpg" alt="Gubka" />
                <p className={styles.Rightanswer}>Верный ответ:</p>
              </div>
  
              <div className={styles.answers}>
                {currentQuestion.answers.map((answer, index) => (
                  <button
                    key={index}
                    className={
                      answer === currentQuestion.rightanswer
                        ? styles.answerRight
                        : styles.answerWrong
                    }
                    disabled // Отключаем кнопки, чтобы на них нельзя было нажать
                  >
                    {answer}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }