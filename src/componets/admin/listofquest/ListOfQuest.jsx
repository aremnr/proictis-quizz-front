import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styles from "./listofquest.module.css";
import Button from "@mui/material/Button";
import axios from "axios";

export function ListOfQuest() {
  const [quizData, setQuizData] = useState(null);
  const { quiz_id } = useParams();
  const navigate = useNavigate();

  const accessToken = localStorage.getItem("access_token");
  useEffect(() => {
    const getQuestionsByQuizId = () => {
      axios
        .get(
          `https://quiz.dev.schtil.com/quiz/${quiz_id}`,
          {},
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${accessToken}`,
            },
          }
        )
        .then((response) => {
          console.log("quiz data: ", response.data);
          setQuizData(response.data);
        })
        .catch((error) => {
          console.error("Ошибка при получении вопроса:", error);
        });
    };

    getQuestionsByQuizId();
  }, [quiz_id, accessToken]);

  if (!quizData) {
    return <p>Загрузка...</p>;
  }

  // Массив вопросов
  const questions = Array.from(
    { length: quizData.question_count },
    (_, index) => `Вопрос ${index + 1}`
  );

  // Обработчик клика на вопрос
  const handleQuestionClick = (index) => {
    if (quiz_id) {
      console.log("Navigating to QuestionView with quizId:", quiz_id);
      // Передаем quizId при навигации на QuestionView
      navigate(`/${quiz_id}/questionview/${index + 1}`, {
        state: { timer: quizData.timer },
      });
    } else {
      console.error("Quiz ID is not available.");
    }
  };

  // Обработчик кнопки "Назад"
  const handleBack = () => {
    // Передаем maxQuestions и quizId при навигации назад
    navigate(`/${quiz_id}/done`, {
      state: { maxQuestions: quizData.question_count, quiz_id },
    });
  };

  return (
    <div className={styles.bg}>
      <div className={styles.OuterContainer}>
        <div className={styles.InnerContainer}>
          <div className={styles.questionList}>
            {questions.map((question, index) => (
              <Button
                key={index}
                color="secondary"
                variant="contained"
                className={styles.questionButton}
                onClick={() => handleQuestionClick(index)} // При клике на вопрос переходим на его страницу
              >
                {question}
              </Button>
            ))}
          </div>
        </div>
        {/* Кнопка "Назад" вне InnerContainer */}
        <div className={styles.backButtonContainer}>
          <Button
            color="secondary"
            variant="contained"
            className={styles.backButton}
            onClick={handleBack}
          >
            Назад
          </Button>
        </div>
      </div>
    </div>
  );
}
