import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import styles from './addquestion.module.css';

export function AddQuestion() {
  const location = useLocation()
  const maxQuestions = location.state.maxQuestions
  const [questions, setQuestions] = useState([{ text: '', answers: ['', '', '', '', ''], points: 1, correctAnswerIndices: [] }]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [isLastQuestion, setIsLastQuestion] = useState(false);
  const navigate = useNavigate();

  const handleInputChange = (index, event) => {
    const newQuestions = [...questions];
    newQuestions[currentQuestion].answers[index] = event.target.value;
    setQuestions(newQuestions);
  };

  const addAnswerField = () => {
    const newQuestions = [...questions];
    if (newQuestions[currentQuestion].answers.length < 5) {
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
    console.log(currentQuestion, maxQuestions)
    if (isLastQuestion || currentQuestion + 1 >= maxQuestions) {
      const quizData = {
        questions: questions,
      };
      localStorage.setItem('quizData', JSON.stringify(quizData));
      navigate('/done', { state: { maxQuestions } });
    } else {
      const newQuestion = { text: '', answers: ['', '', '', '', ''], points: 1, correctAnswerIndices: [] };
      setQuestions([...questions, newQuestion]);
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  useEffect(() => {
    const savedQuiz = localStorage.getItem('quizData');
    if (savedQuiz) {
      const quizData = JSON.parse(savedQuiz);
      setQuestions(quizData.questions);
    }
  }, []);

  const handleBackClick = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    } else {
      navigate(-1);
    }
  };

  const handleCheckboxChange = (event) => {
    setIsLastQuestion(event.target.checked);
  };

  const handleCorrectAnswerChange = (index) => {
    const newQuestions = [...questions];
    const correctAnswers = newQuestions[currentQuestion].correctAnswerIndices || [];

    console.log('Before:', correctAnswers);

    if (correctAnswers.includes(index)) {
      newQuestions[currentQuestion].correctAnswerIndices = correctAnswers.filter(i => i !== index);
    } else {
      newQuestions[currentQuestion].correctAnswerIndices = [...correctAnswers, index];
    }

    console.log('After:', newQuestions[currentQuestion].correctAnswerIndices);
    setQuestions(newQuestions);

    console.log(questions)
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
                <div key={index} className={styles.answerOption}>
                  <label className={styles.inputContainer}>
                    <input
                      type="text"
                      placeholder="добавить вариант ответа"
                      value={answer}
                      onChange={(e) => handleInputChange(index, e)}
                      className={styles.variantsInput}
                    />
                    <input
                      type="checkbox" // Измените на checkbox для множественного выбора
                      checked={questions[currentQuestion].correctAnswerIndices?.includes(index) || false} // Добавляем || false для безопасности
                      onChange={() => handleCorrectAnswerChange(index)} // Установка правильного ответа
                      className={`${styles.checkmark} ${questions[currentQuestion].correctAnswerIndices?.includes(index) ? styles.selected : ''}`} // Добавьте класс для стилей
                    />
                  </label>
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
