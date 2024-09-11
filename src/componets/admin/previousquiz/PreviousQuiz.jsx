import styles from './previousquiz.module.css';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // Импортируем useNavigate из react-router-dom

// Пример данных для 12 квизов
const quizzes = [
  { title: 'Quiz 1', description: 'Описание квиза 1', path: '/quiz1' },
  { title: 'Quiz 2', description: '', path: '/quiz2' },
  { title: 'Кошки: Интересные факты о них', description: 'Всего существует 33 основных кошачьих породы. А количество домашних кошек в мире достигает 500 миллионов. Частота пульса у кошки гораздо выше, чем у человека и составляет от 110 до 140 ударов сердца в минуту. В среднем кошки весят около пяти килограммов, а вот кошки Сингапурской породы – всего два с небольшим килограмма.', path: '/quiz3' },
  { title: 'Quiz 4', description: '', path: '/quiz4' },
  { title: 'Quiz 5', description: '', path: '/quiz5' },
  { title: 'Quiz 6', description: '', path: '/quiz6' },
  { title: 'Quiz 7', description: 'Описание квиза 7', path: '/quiz7' },
  { title: 'Quiz 8', description: 'Описание квиза 8', path: '/quiz8' },
  { title: 'Quiz 9', description: 'Описание квиза 9', path: '/quiz9' },
  { title: 'Quiz 10', description: '', path: '/quiz10' },
  { title: 'Quiz 11', description: 'Описание квиза 11', path: '/quiz11' },
  { title: 'Quiz 12', description: '', path: '/quiz12' }
];

export function PreviousQuiz() {
  const [quizList, setQuizList] = useState([]);
  const navigate = useNavigate(); // Используем useNavigate для навигации

  useEffect(() => {
    setQuizList(quizzes); // Эмуляция получения данных с бэкенда
  }, []);

  const handleQuizClick = (path) => {
    navigate(path); // Перенаправляем на нужный путь
  };

  const handleBackClick = () => {
    navigate(-1); // Возвращаемся на предыдущую страницу
  };

  return (
    <div className={styles.bg}>
      <div className={styles.OuterContainer}>
     
        <div className={styles.InnerContainer}>
          {/* Заголовок "Все quiz игры" */}
          <h2 className={styles.header}>Все quiz игры</h2>
          <div className={styles.quizListContainer}>
            {quizList.map((quiz, index) => (
              <div 
                key={index} 
                className={styles.quizItem} 
                onClick={() => handleQuizClick(quiz.path)} // Обработка нажатия на квиз
              >
                <div className={styles.quizTitle}>Квиз:{<br></br>}{quiz.title}</div>
                <div className={styles.quizDescription}>
                  Описание: {<br></br>}
                  {quiz.description ? quiz.description : 'Без описания'}
                </div>
              </div>
            ))}
             
          </div>
         
        </div> <button className={styles.backButton} onClick={handleBackClick}>
          &#8592;
        </button>
      </div>
    </div>
  );
}
