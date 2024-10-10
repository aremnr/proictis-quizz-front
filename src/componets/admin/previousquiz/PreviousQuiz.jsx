import styles from './previousquiz.module.css';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'; // Импортируем axios

export function PreviousQuiz() {
  const [quizList, setQuizList] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Закомментировано: получение списка квизов с бэкенда
    /*
    axios.get('https://quiz.dev.schtil.com/quizzes')
      .then(response => {
        setQuizList(response.data); // Устанавливаем квизы в состояние после получения с бэкенда
      })
      .catch(error => {
        console.error('Ошибка при получении квизов:', error);
      });
    */
  }, []);

  const handleQuizClick = (quiz) => {
    // Закомментировано: сохранение выбранного квиза на бэкенде или в другом состоянии
    /*
    axios.post(`https://quiz.dev.schtil.com/quiz/${quiz.id}/select`)
      .then(() => {
        navigate('/AddQuestion'); // Перенаправляем на страницу добавления вопросов
      })
      .catch(error => {
        console.error('Ошибка при выборе квиза:', error);
      });
    */
    navigate('/AddQuestion'); // Переход пока без взаимодействия с бэкендом
  };

  const handleBackClick = () => {
    navigate(-1); // Возвращаемся на предыдущую страницу
  };

  return (
    <div className={styles.bg}>
      <div className={styles.OuterContainer}>
        <div className={styles.InnerContainer}>
          <h2 className={styles.header}>Все quiz игры</h2>
          <div className={styles.quizListContainer}>
            {quizList.length > 0 ? (
              quizList.map((quiz) => (
                <div 
                  key={quiz.id} 
                  className={styles.quizItem} 
                  onClick={() => handleQuizClick(quiz)} // Обработка нажатия на квиз
                >
                  <div className={styles.quizTitle}>Квиз: {<br />}{quiz.title}</div>
                  <div className={styles.quizDescription}>
                    Описание: {<br />}
                    {quiz.description ? quiz.description : 'Без описания'}
                  </div>
                </div>
              ))
            ) : (
              <div>Нет доступных квизов.</div>
            )}
          </div>
        </div> 
        <button className={styles.backButton} onClick={handleBackClick}>
          &#8592;
        </button>
      </div>
    </div>
  );
}
