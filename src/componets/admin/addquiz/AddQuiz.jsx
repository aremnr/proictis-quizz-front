import styles from './addquiz.module.css';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Checkbox, FormControlLabel, TextField } from '@mui/material';
import axios from 'axios'; // Импорт axios

export function AddQuiz() {
  const [time, setTime] = useState(''); // Таймер как строка
  const [maxQuestions, setMaxQuestions] = useState(''); // Количество вопросов как строка
  const [isTimerEnabled, setIsTimerEnabled] = useState(true); // Включен ли таймер

  const navigate = useNavigate();

  const handleSubmit = () => {
    // Проверка, что все поля заполнены
    if ((!maxQuestions || maxQuestions === '0') || (isTimerEnabled && (!time || time === '0'))) {
      alert('Пожалуйста, заполните количество вопросов и настройте таймер или отключите его.');
      return;
    }

    // Если все поля заполнены, переводим на другую страницу
    handleQuizCreation();
  };

  const handleQuizCreation = () => {
  //   const quizData = {
  //     title: 'Новый квиз', // Пример данных, можно сделать динамическим
  //     description: 'Описание квиза', // Пример данных, можно сделать динамическим
  //     questions: [
  //       {
  //         question: "Пример вопроса", // Можешь обновить логикой для добавления вопросов
  //         points: 1, // Пример очков
  //         answers: [
  //           {
  //             text: "Пример ответа", // Пример ответа
  //             correct: true, // Пример правильного ответа
  //           }
  //         ]
  //       }
  //     ]
  //   };

  //   axios.post('https://quiz.schtil.com/quiz/add', quizData, {
  //     headers: {
  //       'Content-Type': 'application/json',
  //     },
  //   })
  //   .then(response => {
  //     console.log('Квиз успешно создан:', response.data);
      navigate('/aboutquiz', { state: { maxQuestions } });
  //   })
  //     .catch(error => {
  //       console.error('Ошибка при создании квиза:', error);
  //       alert('Произошла ошибка при создании квиза.');
  //     });
  };

  const handleBackClick = () => {
    navigate(-1);
  };

  return (
    <div className={styles.bg}>
      <div className={styles.OuterContainer}>
        
        <div className={styles.InnerContainer}>
          <h2 className={styles.header}>Создание quiz-игры</h2>

          <p className={styles.timerHint}>Укажите время (максимум 2 минуты)</p>

          <p className={styles.timerLabel}>Таймер</p>
          <div className={styles.timerContainer}>
            <TextField
              className={styles.timerInput}
              type="number"
              variant="outlined"
              value={time}
              onChange={(e) => {
                const value = e.target.value;
                if (value === '' || (Number(value) >= 0 && Number(value) <= 2)) {
                  setTime(value);
                }
              }} // Позволяем удалять значение и ограничиваем до 2 минут
              disabled={!isTimerEnabled}
              inputProps={{ min: 0, max: 2 }}
              sx={{
                '& .MuiOutlinedInput-root': {
                  borderRadius: '30px',
                  backgroundColor: '#D9D9D9',
                  border: 'none',
                  width: '70%',
                },
                '& .MuiOutlinedInput-notchedOutline': {
                  border: 'none',
                },
              }}
            />
          </div>

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

          <div>
            <p className={styles.questionsLabel}>Количество вопросов</p>
            
            <TextField
              className={styles.timerInput}
              type="number"
              variant="outlined"
              value={maxQuestions}
              onChange={(e) => {
                const value = e.target.value;
                if (value === '' || (Number(value) >= 1 && Number(value) <= 20)) {
                  setMaxQuestions(value);
                }
              }} // Позволяем удалять значение и ограничиваем до 20 вопросов
              inputProps={{ min: 1, max: 20 }}
              sx={{
                '& .MuiOutlinedInput-root': {
                  borderRadius: '30px',
                  backgroundColor: '#D9D9D9',
                  border: 'none',
                  width: '70%',
                },
                '& .MuiOutlinedInput-notchedOutline': {
                  border: 'none',
                },
              }}
            />
            <p className={styles.timerHint}>(макс. 20)</p>
          </div>

          <div>
            <Button 
              variant="contained"
              color="secondary"
              className={styles.buttonstart}
              onClick={handleSubmit}>
              Перейти к созданию квиза
            </Button>
          </div>

          <button className={styles.backButton} onClick={handleBackClick}>
            &#8592;
          </button>
        </div>
      </div>
    </div>
  );
}
