import styles from './previousquiz.module.css';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export function PreviousQuiz() {
  const [quizList, setQuizList] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const savedQuizzes = JSON.parse(localStorage.getItem('quizzes')) || [];
    setQuizList(savedQuizzes); // Устанавливаем квизы в состояние
  }, []);

  const handleQuizClick = (quiz) => {
    // Сохраняем выбранный квиз в localStorage
    localStorage.setItem('currentQuiz', JSON.stringify(quiz));
    navigate('/AddQuestion'); // Перенаправляем на страницу добавления вопросов
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
