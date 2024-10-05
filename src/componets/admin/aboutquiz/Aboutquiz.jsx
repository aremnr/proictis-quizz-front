import styles from './aboutquiz.module.css';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@mui/material';

export function Aboutquiz() {
  const [name, setName] = useState('');
  const [description, setDescription] = useState(''); // Добавляем состояние для описания
  const navigate = useNavigate();

  const handleBackClick = () => {
    navigate(-1);
  };

  const handleSubmit = () => {
    if (!name) {
      alert('Пожалуйста, заполните поле с названием');
      return;
    }

    // Создаем уникальный id для нового квиза
    const id = Date.now(); // Используем временную метку в качестве уникального идентификатора
    const newQuiz = { id, title: name, description }; // Создаем объект квиза

    // Получаем текущий список квизов из localStorage
    const savedQuizzes = JSON.parse(localStorage.getItem('quizzes')) || [];
    savedQuizzes.push(newQuiz); // Добавляем новый квиз в список
    localStorage.setItem('quizzes', JSON.stringify(savedQuizzes)); // Сохраняем обновленный список в localStorage

    navigate('/AddQuestion'); // Перенаправляем на страницу добавления вопросов
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
