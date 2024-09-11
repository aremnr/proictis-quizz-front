import styles from './addquiz.module.css';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Checkbox, FormControlLabel, TextField } from '@mui/material';

export function AddQuiz() {
  const [time, setTime] = useState(0); // Таймер
  const [questions, setQuestions] = useState(0); // Количество вопросов
  const [isTimerEnabled, setIsTimerEnabled] = useState(true); // Включен ли таймер

  const navigate = useNavigate();

  const handleSubmit = () => {
    // Проверка, что все поля заполнены
    if (!questions || (isTimerEnabled && !time)) {
      alert('Пожалуйста, заполните количество вопросов и настройте таймер или отключите его.'); // Выводим предупреждение
      return;}

    // Если все поля заполнены, переводим на другую страницу
    navigate('/Welcome'); // Замените '/next-page' на путь, куда хотите перейти
};

  const handleQuizCreation = () => {
    const quizData = {
      time: isTimerEnabled ? time : null, // Если таймер отключен, отправляем null
      questions: questions,
    };
    console.log('Отправка данных на бэкенд:', quizData);
    // Здесь можно добавить логику отправки данных на бэкенд
  };

  const handleBackClick = () => {
    navigate(-1);
  };

  return (
    <div className={styles.bg}>
      <div className={styles.OuterContainer}>
        <div className={styles.InnerContainer}>
          {/* Заголовок */}
          <h2 className={styles.header}>Создание quiz-игры</h2>

          {/* Подсказка для таймера */}
          <p className={styles.timerHint}>Укажите время (максимум 2 минуты)</p>

          {/* Таймер */}
          <p className={styles.timerLabel}>Таймер</p>
          <div className={styles.timerContainer}>
            <TextField
              className={styles.timerInput}
              type="number"
              variant="outlined"
              value={time}
              onChange={(e) => setTime(Math.min(2, Math.max(0, e.target.value)))} // Ограничиваем до 2 минут
              disabled={!isTimerEnabled}
              inputProps={{ min: 0, max: 2 }}
              sx={{
                '& .MuiOutlinedInput-root': {
                  borderRadius: '30px',
                  backgroundColor: '#D9D9D9',
                  border: 'none', // Убираем границу
                  width: '70%', // Ширина 70% от контейнера
                },
                '& .MuiOutlinedInput-notchedOutline': {
                  border: 'none', // Убираем стандартную границу Material UI
                },
              }}
            />
          </div>

          {/* Чекбокс для отключения таймера */}
          <div>
            <FormControlLabel
              control={
                <Checkbox
                  checked={!isTimerEnabled}
                  onChange={() => setIsTimerEnabled(!isTimerEnabled)}
                />
              }
              
              label="Таймер не нужен"
            />
          </div>

          {/* Количество вопросов */}
          <div>
            <p className={styles.questionsLabel}>Количество вопросов</p>
            <TextField
              className={styles.timerInput}
              type="number"
              variant="outlined"
              value={questions}
              onChange={(e) => setQuestions(Math.min(20, Math.max(1, e.target.value)))} // Ограничение до 20 вопросов
              inputProps={{ min: 1, max: 20 }}
              sx={{
                '& .MuiOutlinedInput-root': {
                  borderRadius: '30px',
                  backgroundColor: '#D9D9D9',
                  border: 'none', // Убираем границу
                  width: '70%', // Ширина 70% от контейнера
                },
                '& .MuiOutlinedInput-notchedOutline': {
                  border: 'none', // Убираем стандартную границу Material UI
                },
              }}
            />
          </div>

          {/* Кнопка создания квиза */}
          <div>
          <Button 
          variant="contained"
          color="secondary"
          className={styles.buttonstart}
          onClick={handleSubmit}>
          Перейти к созданию квиза
          </Button>
          </div>

          {/* Кнопка назад */}
          <button className={styles.backButton} onClick={handleBackClick}>
            &#8592;
          </button>
        </div>
      </div>
    </div>
  );
}
