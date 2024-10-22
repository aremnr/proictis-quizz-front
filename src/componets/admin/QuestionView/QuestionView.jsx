import React, { useEffect, useState } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import styles from "./questionview.module.css"; // Импортируем стили
import Button from "@mui/material/Button";
import { Timer } from "../../client/Timer/timer1/Timer";
import axios from "axios";

export function QuestionView() {
  const location = useLocation();
  const [questionData, setQuestionData] = useState(null);
  const [isRight, setIsRight] = useState(false);
  const { quiz_id, question_number } = useParams();
  const navigate = useNavigate();
  const [checking, setChecking] = useState(true);
  const timer = location.state?.timer || 0;

  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const handleBackClick = () => {
    navigate(-1); // Возвращаемся на предыдущую страницу
  };

  const accessToken = localStorage.getItem("access_token");
  useEffect(() => {
    const getQuestionsByQuizId = () => {
      axios
        .get(
          `https://quiz.dev.schtil.com/quiz/${quiz_id}/question`,
          {
            params: {
              question_number: question_number,
            },
          },
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${accessToken}`,
            },
          }
        )
        .then((response) => {
          console.log(response.data);
          setQuestionData(response.data);
        })
        .catch((error) => {
          console.error("Ошибка при получении вопроса:", error);
        });
    };

    getQuestionsByQuizId();
    setSelectedAnswer(null);
  }, [quiz_id, question_number, accessToken]);

  if (!questionData) {
    return <p>Загрузка...</p>;
  }

  const handleAnswerClick = (index) => {
    setChecking(false);
    axios
      .get(`https://quiz.dev.schtil.com/quiz/${quiz_id}/ans_check`, {
        params: {
          question_number: question_number,
          answer_number: index + 1,
        },
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((response) => {
        setChecking(true);
        console.log("is right: ", response.data);
        setIsRight(response.data.is_right);
      })
      .catch((error) => {
        console.error("Ошибка при проверке ответа:", error);
      });

    setSelectedAnswer(index);
  };

  const handleTimerEnd = () => {};

  return (
    <div className={styles.bg}>
      <div className={styles.main}>
        <div className={styles.overlay}></div>

        <Button
          variant="contained"
          color="secondary"
          className={styles.backButton}
          onClick={handleBackClick}
        >
          вернуться списку
        </Button>

        {/* Кнопка с динамическим текстом вопроса */}
        <Button
          variant="contained"
          color="secondary"
          className={styles.topButton}
        >
          Вопрос {question_number}
        </Button>

        <div className={styles.outerContainer}>
          <div className={styles.innerContainer}>
            <div className={styles.elements}>
              <p className={styles.question}>{questionData.question_text}</p>
              <div className={styles.questPhoto}>
                <img
                  className={styles.photo}
                  src="/thinkingfacegif.gif"
                  alt="thinkingface"
                />
              </div>
              {timer !== 0 && (
                <div className={styles.timerpadding1}>
                  <Timer
                    key={question_number}
                    seconds={timer}
                    onTimerEnd={handleTimerEnd}
                  />
                </div>
              )}
              <div className={styles.answers}>
                {questionData.answers_list.list.map((answer, index) => (
                  <Button
                    variant="contained"
                    color="secondary"
                    key={index}
                    className={`${styles.answer} 
                  ${selectedAnswer === index ? styles.selected : ""}
                  ${
                    selectedAnswer === index && isRight && checking
                      ? styles.correct
                      : ""
                  }
                    ${
                      selectedAnswer === index && !isRight && checking
                        ? styles.incorrect
                        : ""
                    }
                `}
                    onClick={() => handleAnswerClick(index)}
                  >
                    {answer.answer_text}
                  </Button>
                ))}
              </div>
            </div>
            <div className={styles.avatarperson}>
              <img className={styles.ava} src="/ava2.png" alt="avatar" />
              <img className={styles.ava} src="/ava3.png" alt="avatar" />
              <img className={styles.ava} src="/ava.png" alt="avatar" />
              <img className={styles.ava} src="/ava5.png" alt="avatar" />
              <img className={styles.ava} src="/ava4.png" alt="avatar" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
