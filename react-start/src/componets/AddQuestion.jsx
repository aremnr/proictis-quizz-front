import React, { useState, useEffect } from 'react';
import '../addQuestion.css';

let questionCount = 0;

export const QuizForm = () => {
  const [questions, setQuestions] = useState([]);

  // Добавляем первый вопрос при монтировании компонента
  useEffect(() => {
    addQuestion();
  }, []);

  const addQuestion = () => {
    questionCount++;
    setQuestions([...questions, { id: questionCount, text: '', points: 0, answers: [] }]);
  };

  const addAnswer = (questionId) => {
    const updatedQuestions = questions.map((q) => {
      if (q.id === questionId) {
        return {
          ...q,
          answers: [...q.answers, { text: '', correct: false }]
        };
      }
      return q;
    });
    setQuestions(updatedQuestions);
  };

  const handleQuestionChange = (questionId, text) => {
    const updatedQuestions = questions.map((q) => {
      if (q.id === questionId) {
        return { ...q, text };
      }
      return q;
    });
    setQuestions(updatedQuestions);
  };

  const handlePointsChange = (questionId, points) => {
    const updatedQuestions = questions.map((q) => {
      if (q.id === questionId) {
        return { ...q, points: Number(points) }; // Преобразуем значение в число
      }
      return q;
    });
    setQuestions(updatedQuestions);
  };

  const handleAnswerChange = (questionId, answerIndex, text) => {
    const updatedQuestions = questions.map((q) => {
      if (q.id === questionId) {
        const updatedAnswers = q.answers.map((a, i) => {
          if (i === answerIndex) {
            return { ...a, text };
          }
          return a;
        });
        return { ...q, answers: updatedAnswers };
      }
      return q;
    });
    setQuestions(updatedQuestions);
  };

  const handleCorrectAnswerChange = (questionId, answerIndex) => {
    const updatedQuestions = questions.map((q) => {
      if (q.id === questionId) {
        const updatedAnswers = q.answers.map((a, i) => ({
          ...a,
          correct: i === answerIndex
        }));
        return { ...q, answers: updatedAnswers };
      }
      return q;
    });
    setQuestions(updatedQuestions);
  };

  const submitQuiz = () => {
    const quizData = {
      questions
    };

    console.log(quizData);
    try {
      const token = localStorage.getItem('authToken');
      fetch('quiz/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(quizData)
      }).then((response) => {
        if (response.ok) {
          alert('Квиз успешно добавлен.');
        }
      });
    } catch (error) {
      console.error('Error:', error);
      alert('Ошибка отправки викторины.');
    }
  };

  return (
    <div className="fieldAddQuest">
      {questions.map((question, questionIndex) => (
        <div key={question.id} className="question-container">
          <label className="text" htmlFor={`question-${question.id}`}>Вопрос {questionIndex + 1}</label><br />
          <input
            className="TextField"
            type="text"
            id={`question-${question.id}`}
            placeholder="Введите вопрос"
            value={question.text}
            onChange={(e) => handleQuestionChange(question.id, e.target.value)}
          /><br />
          <label className="awerds" htmlFor={`points-${question.id}`}>Баллы за вопрос:</label><br />
          <input
            className="number"
            type="number"
            id={`points-${question.id}`}
            value={question.points}
            onChange={(e) => handlePointsChange(question.id, e.target.value)}
            min="0"
          /><br />
          
          {/* Рендеринг ответов перед кнопкой "Добавить Ответ" */}
          <div id={`answers-${question.id}`} className="answer-container">
            {question.answers.map((answer, answerIndex) => (
              <div key={answerIndex}>
                <label className="textAns" htmlFor={`answer-${question.id}-${answerIndex}`}>
                  Ответ {answerIndex + 1}:
                </label>
                <input
                  className="answer"
                  type="text"
                  id={`answer-${question.id}-${answerIndex}`}
                  placeholder="Введите ответ"
                  value={answer.text}
                  onChange={(e) => handleAnswerChange(question.id, answerIndex, e.target.value)}
                />
                <label className="textLable">
                  <input
                    type="radio"
                    name={`correct-${question.id}`}
                    checked={answer.correct}
                    onChange={() => handleCorrectAnswerChange(question.id, answerIndex)}
                  />
                  Правильный
                </label>
              </div>
            ))}
          </div>
          
          <button
            type="button"
            className="add-btn"
            onClick={() => addAnswer(question.id)}
          >
            Добавить Ответ
          </button><br />
        </div>
      ))}
      
      {/* Кнопки перемещены вниз */}
      <div className="button-group">
        <button className="add-btn" type="button" onClick={addQuestion}>Добавить Вопрос</button><br />
        <button className="add-btn" type="button" onClick={submitQuiz}>Отправить Квиз</button>
      </div>
    </div>
  );
};
