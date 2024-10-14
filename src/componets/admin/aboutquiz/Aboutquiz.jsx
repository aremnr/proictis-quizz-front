import styles from './aboutquiz.module.css';
import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Button } from '@mui/material';

export function Aboutquiz() {
  const [name, setName] = useState('');
  const [description, setDescription] = useState(''); // Добавляем состояние для описания
  const navigate = useNavigate();
  const location = useLocation()

  const handleBackClick = () => {
    navigate(-1);
  };

  const handleSubmit = () => {
    if (!name) {
      alert('Пожалуйста, заполните поле с названием');
      return;
    }
  
    navigate('/AddQuestion', { 
      state: { 
        maxQuestions: location.state.maxQuestions, 
        time: location.state.time, 
        title: name, 
        description 
      } 
    });
  };

  return (
    <div className={styles.bg}>
      <div className={styles.OuterContainer}>
        <div className={styles.InnerContainer}>
          <div>
            <h2 className={styles.header}>Quiz</h2>
            <p className={styles.timerLabel}>Название</p>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className={styles.inputStyle}
            />
          </div>

          <div>
            <p className={styles.timerLabel}>Описание (необязательно)</p>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)} // Добавляем обработчик изменения для описания
              className={styles.inputStyle}
            />
          </div>
          <Button 
            variant="contained"
            color="secondary"
            className={styles.buttonstart}
            onClick={handleSubmit}>
            Перейти к добавлению вопросов
          </Button>
          <button className={styles.backButton} onClick={handleBackClick}>
            &#8592;
          </button>
        </div>
      </div>
    </div>
  );
}
