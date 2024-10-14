import React, { useState, useEffect } from "react";
import styles from "./questionstyle.module.css";
import { Timer } from "../Timer/timer1/Timer";
import Button from "@mui/material/Button";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { ws, quiz, currentQuestion } from "../Home/Home";

export function Questions() {
  const navigate = useNavigate();
  const location = useLocation();
  const { quiz_id } = useParams();
  const data = location.state.data;

  const [selectedAnswer, setSelectedAnswer] = useState(null);

  // Сбрасываем выбранный ответ при изменении вопроса
  useEffect(() => {
    setSelectedAnswer(null);
  }, [quiz_id]); // Зависимость от id, чтобы сбрасывать состояние при изменении вопроса

  if (!data) {
    return <p>Вопрос не найден.</p>;
  }

  const handleAnswerClick = (index) => {
    console.log("answer_index + 1: ", index + 1);
    const headers = { type: "check_answer" };
    index++;
    ws.send(JSON.stringify({ headers, index }));
    setSelectedAnswer(index);
    navigate(`/quiz/${quiz_id}/question/${currentQuestion.id}/answer`);
  };

  const handleTimerEnd = () => {
    // Переходим на страницу с ответом для текущего вопроса
    // navigate(`answer/${id}`);
  };

  return (
    <div>
      <div className={styles.bgimage}>
        <div className={styles.outerContainer}>
          <div className={styles.innerContainer}>
            <div className={styles.elements}>
              <p className={styles.question}>{data.question_text}</p>
              <div className={styles.questPhoto}>
                <img
                  className={styles.photo}
                  src="/thinkingface.png"
                  alt="Gubka"
                />
              </div>
              <div className={styles.timerpadding1}>
                <Timer
                  key={quiz_id}
                  seconds={quiz.timer}
                  onTimerEnd={handleTimerEnd}
                />
              </div>
              <div className={styles.answers}>
                {data.answers_list.list.map((answer, index) => (
                  <Button
                    variant="contained"
                    color="secondary"
                    key={index}
                    className={`${styles.answer} ${
                      selectedAnswer === index ? styles.selected : ""
                    }`}
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
