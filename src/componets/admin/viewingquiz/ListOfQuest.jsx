import React from 'react';
import { useLocation } from 'react-router-dom';
import styles from './listofquest.module.css';
import Button from '@mui/material/Button';

export function ListOfQuest() {
  const location = useLocation();
  const maxQuestions = location.state?.maxQuestions || 10;

  const questions = Array.from({ length: maxQuestions }, (_, index) => `Вопрос ${index + 1}`);

  return (
    <div className={styles.bg}>
      <div className={styles.OuterContainer}>
          <div className={styles.InnerContainer}>
            <div className={styles.questionList}>
              {questions.map((question, index) => (
                <Button key={index} 
                color="secondary"
                variant="contained" className={styles.questionButton}>
                  {question}
                </Button>
              ))}
            </div>
          </div>
      </div>
    </div>
  );
}
