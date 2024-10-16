import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import styles from "./addquestion.module.css";
import axios from "axios";

export function AddQuestion() {
  const location = useLocation();
  const maxQuestions = location.state.maxQuestions;
  const [questions, setQuestions] = useState([
    { text: "", answers: [""], points: 1, correctAnswerIndices: [] },
  ]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [isLastQuestion, setIsLastQuestion] = useState(false);
  const [errors, setErrors] = useState({ textError: "", answerErrors: [""] }); // Статус ошибок
  const navigate = useNavigate();
  const accessToken = localStorage.getItem("access_token");
  const [successAlert, setSuccessAlert] = useState(false);
  const [quizId, setQuizId] = useState(null);

  if (!accessToken) {
    alert("Требуется авторизация");
    return;
  }

  const handleInputChange = (index, event) => {
    const newQuestions = [...questions];
    newQuestions[currentQuestion].answers[index] = event.target.value;
    setQuestions(newQuestions);

    // Сброс ошибки для текущего ответа
    const newAnswerErrors = [...errors.answerErrors];
    newAnswerErrors[index] = "";
    setErrors({ ...errors, answerErrors: newAnswerErrors });
  };

  const addAnswerField = () => {
    const newQuestions = [...questions];
    if (newQuestions[currentQuestion].answers.length < 5) {
      newQuestions[currentQuestion].answers.push("");
      setQuestions(newQuestions);

      // Добавляем пустую ошибку для нового поля
      setErrors({ ...errors, answerErrors: [...errors.answerErrors, ""] });
    }
  };

  const handleQuestionTextChange = (event) => {
    const newQuestions = [...questions];
    newQuestions[currentQuestion].text = event.target.value;
    setQuestions(newQuestions);

    // Сброс ошибки для текста вопроса
    setErrors({ ...errors, textError: "" });
  };

  const handlePointsChange = (event) => {
    const newQuestions = [...questions];
    newQuestions[currentQuestion].points = Number(event.target.value);
    setQuestions(newQuestions);
  };

  const handleNextClick = () => {
    const currentQ = questions[currentQuestion];
    let hasError = false;

    if (!currentQ.text) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        textError: "Пожалуйста, введите текст вопроса",
      }));
      hasError = true;
    }

    const newAnswerErrors = currentQ.answers.map((answer) =>
      answer.trim() === "" ? "Пожалуйста, заполните этот вариант ответа" : ""
    );
    setErrors((prevErrors) => ({
      ...prevErrors,
      answerErrors: newAnswerErrors,
    }));

    if (newAnswerErrors.some((error) => error !== "")) {
      hasError = true;
    }

    if (currentQ.correctAnswerIndices.length === 0) {
      hasError = true;
      alert("Пожалуйста, выберите хотя бы один правильный ответ");
    }

    if (hasError) {
      return;
    }

    if (currentQuestion + 1 >= maxQuestions || isLastQuestion) {
      const quizData = {
        title: location.state.title,
        description: location.state.description || "",
        timer: location.state.time,
        questions: questions.slice(0, maxQuestions).map((q) => ({
          question: q.text,
          points: q.points,
          answers: q.answers.map((a, index) => ({
            text: a,
            correct:
              Array.isArray(q.correctAnswerIndices) &&
              q.correctAnswerIndices.includes(index),
          })),
        })),
      };

      axios
        .post("https://quiz.dev.schtil.com/quiz/add", quizData, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
        })
        .then((response) => {
          const quizId = response.data; // Сервер возвращает quizId как строку
          setQuizId(quizId); // Сохраняем quizId в стейт
          console.log("Quiz id:", quizId); // Проверим, что quizId корректно сохранился
          alert("Квиз успешно создан!");
          navigate(`/${quizId}/done`, { state: { maxQuestions, quizId } }); // Передаем quizId при навигации
        })
        .catch((error) => {
          if (error.response && error.response.data) {
            console.error("Ошибка от сервера:", error.response.data);
            // Выводим поле detail, чтобы увидеть сообщение
            if (error.response.data.detail) {
              console.error("Детали ошибки:", error.response.data.detail);
            }
          } else {
            console.error("Ошибка при создании квиза:", error);
          }
        });
    } else {
      if (questions.length < maxQuestions) {
        const newQuestion = {
          text: "",
          answers: [""],
          points: 1,
          correctAnswerIndices: [],
        };
        setQuestions([...questions, newQuestion]);
      }
      setCurrentQuestion(currentQuestion + 1);
    }
  };

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
    const correctAnswers =
      newQuestions[currentQuestion].correctAnswerIndices || [];

    if (correctAnswers.includes(index)) {
      newQuestions[currentQuestion].correctAnswerIndices =
        correctAnswers.filter((i) => i !== index);
    } else {
      newQuestions[currentQuestion].correctAnswerIndices = [
        ...correctAnswers,
        index,
      ];
    }
    setQuestions(newQuestions);
  };

  return (
    <div className={styles.bg}>
      {successAlert && (
        <div className={styles.alert}>
          <p>Квиз успешно создан! Нажмите Enter для подтверждения.</p>
          <button
            onClick={() => setSuccessAlert(false)}
            className={styles.alertButton}
          >
            OK
          </button>
        </div>
      )}

      <div className={styles.OuterContainer}>
        <div className={styles.InnerContainer}>
          <h2 className={styles.header}>Создание вопросов</h2>
          <p className={styles.timerHint}>Вопрос №{currentQuestion + 1}</p>
          {errors.textError && (
            <p className={styles.error}>{errors.textError}</p>
          )}
          <input
            type="text"
            placeholder="введите текст вопроса"
            value={questions[currentQuestion].text}
            onChange={handleQuestionTextChange}
            className={styles.nameInput}
          />
          {/* Ошибка для текста вопроса */}

          <div className={styles.variants}>
            <div className={styles.answersContainer}>
              {questions[currentQuestion].answers.map((answer, index) => (
                <div key={index} className={styles.answerOption}>
                  {errors.answerErrors[index] && (
                    <p className={styles.error}>{errors.answerErrors[index]}</p>
                  )}{" "}
                  {/* Ошибка отображается над полем */}
                  <label className={styles.inputContainer}>
                    <input
                      type="text"
                      placeholder="добавить вариант ответа"
                      value={answer}
                      onChange={(e) => handleInputChange(index, e)}
                      className={styles.variantsInput}
                    />
                    <input
                      type="checkbox"
                      checked={
                        questions[
                          currentQuestion
                        ].correctAnswerIndices?.includes(index) || false
                      }
                      onChange={() => handleCorrectAnswerChange(index)}
                      className={`${styles.checkmark} ${
                        questions[
                          currentQuestion
                        ].correctAnswerIndices?.includes(index)
                          ? styles.selected
                          : ""
                      }`}
                    />
                  </label>
                </div>
              ))}
            </div>
            {questions[currentQuestion].answers.length < 5 && (
              <button
                className={styles.addAnswerButton}
                onClick={addAnswerField}
              >
                + 1 вариант ответа
              </button>
            )}
          </div>

          <p className={styles.timerHint}>
            укажите количество баллов за этот вопрос
          </p>
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
