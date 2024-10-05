import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './addquestion.module.css';

export function AddQuestion() {
  const [questions, setQuestions] = useState([{ text: '', answers: [''], points: 1 }]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [isLastQuestion, setIsLastQuestion] = useState(false);
  const navigate = useNavigate();

  const handleInputChange = (index, event) => {
    const newQuestions = [...questions];
    newQuestions[currentQuestion].answers[index] = event.target.value;
    setQuestions(newQuestions);
  };

  const addAnswerField = () => {
    if (questions[currentQuestion].answers.length < 5) {
      const newQuestions = [...questions];
      newQuestions[currentQuestion].answers.push('');
      setQuestions(newQuestions);
    }
  };

  const handleQuestionTextChange = (event) => {
    const newQuestions = [...questions];
    newQuestions[currentQuestion].text = event.target.value;
    setQuestions(newQuestions);
  };

  const handlePointsChange = (event) => {
    const newQuestions = [...questions];
    newQuestions[currentQuestion].points = Number(event.target.value);
    setQuestions(newQuestions);
  };

  const handleNextClick = () => {
    if (isLastQuestion || currentQuestion === 4) {
      const quizData = {
        questions: questions,
        // Добавьте здесь другие данные о квизе, если нужно
      };
      localStorage.setItem('quizData', JSON.stringify(quizData)); // Сохраняем вопросы в localStorage
      navigate('/done'); // Навигация на страницу Done
    } else {
      const newQuestion = { text: '', answers: [''], points: 1 };
      setQuestions([...questions, newQuestion]);
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  useEffect(() => {
    const savedQuiz = localStorage.getItem('quizData');
    if (savedQuiz) {
      const quizData = JSON.parse(savedQuiz);
      setQuestions(quizData.questions); // Загружаем вопросы из сохраненного квиза
    }
  }, []);

  const handleBackClick = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    } else {
      navigate('/previousPage'); // Навигация на предыдущую страницу
    }
  };

  const handleCheckboxChange = (event) => {
    setIsLastQuestion(event.target.checked);
  };

  return (
    <div className={styles.bg}>
      <div className={styles.OuterContainer}>
        <div className={styles.InnerContainer}>
          <h2 className={styles.header}>Создание вопросов</h2>
          <p className={styles.timerHint}>Вопрос №{currentQuestion + 1}</p>

          <input
            type="text"
            placeholder="введите текст вопроса"
            value={questions[currentQuestion].text}
            onChange={handleQuestionTextChange}
            className={styles.nameInput}
          />

          <div className={styles.variants}>
            <div className={styles.answersContainer}>
              {questions[currentQuestion].answers.map((answer, index) => (
                <div key={index}>
                  <input
                    type="text"
                    placeholder="добавить вариант ответа"
                    value={answer}
                    onChange={(e) => handleInputChange(index, e)}
                    className={styles.variantsInput}
                  />
                </div>
              ))}
            </div>
            {questions[currentQuestion].answers.length < 5 && (
              <button className={styles.addAnswerButton} onClick={addAnswerField}>+ 1 вариант ответа</button>
            )}
          </div>
          <p className={styles.timerHint}>укажите количество баллов за этот вопрос</p>
          <input
            type="number"
            title="Укажите количество баллов за этот вопрос"
            value={questions[currentQuestion].points}
            onChange={handlePointsChange}
            className={styles.counterinput}
          />

          <div>
            <label>
              <input
                type="checkbox"
                checked={isLastQuestion}
                onChange={handleCheckboxChange}
              />
              Это последний вопрос?
            </label>
          </div>
          <div>
            <button className={styles.buttonstart} onClick={handleNextClick}>
              Далее
            </button>
          </div>
          <button className={styles.backButton} onClick={handleBackClick}>
            &#8592; 
          </button>
        </div>
      </div>
    </div>
  );
}
