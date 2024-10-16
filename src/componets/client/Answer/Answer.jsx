import styles from "./answer.module.css";
import React, { useEffect } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { answerText } from "../../admin/qr/Qr";
import { currentQuestion } from "../Home/Home";

export function Answer() {
  const { id } = useParams(); // Получаем параметр id из URL
  const questionId = parseInt(id, 10); // Преобразуем id в число
  const navigate = useNavigate();
  const location = useLocation();
  const rightAnswer = location.state?.rightAnswer;
  console.log("right answer: ", rightAnswer);
  console.log(answerText);

  if (!currentQuestion) {
    return <p>Вопрос не найден</p>; // Если вопрос с таким id не найден
  }

  console.log("question: ", currentQuestion);
  return (
    <div className={styles.bgimage}>
      <div className={styles.outercontainer2}>
        <div className={styles.innercontainer2}>
          <div className={styles.elements}>
            <p className={styles.question}>{currentQuestion.question}</p>
            <div className={styles.questPhoto}>
              <img
                className={styles.photo}
                src="/thinkingface.png"
                alt="Gubka"
              />
              <p className={styles.Rightanswer}>Верный ответ:</p>
            </div>

            <div className={styles.answers}>
              {currentQuestion.answers_list.list.map((answer, index) => (
                <button
                  key={index}
                  className={
                    index === rightAnswer
                      ? styles.answerRight
                      : styles.answerWrong
                  }
                  disabled // Отключаем кнопки, чтобы на них нельзя было нажать
                >
                  {answer.answer_text}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
