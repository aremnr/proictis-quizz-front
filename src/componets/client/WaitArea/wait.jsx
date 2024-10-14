import styles from "./wait.module.css";
import React from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { currentQuestion } from "../Home/Home";

export function Wait() {
  const navigate = useNavigate(); // Инициализируем хук useNavigate
  const { quiz_id } = useParams();

  // if (ws) {
  //   ws.onmessage = (event) => {
  //     console.log("event: ", event);

  //     if (event.data === "end_game") {
  //       navigate(`/quiz/${quiz_id}/winner`);
  //       return;
  //     }

  //     const parsed = JSON.parse(event.data);
  //     console.log("parsed: ", parsed);
  //     console.log("header: ", parsed["header"]);

  //     if (!parsed[`header`]) {
  //       navigate(`/quiz/${quiz_id}/question/${parsed.id}`, {
  //         state: { data: parsed },
  //       });
  //     }
  //   };
  // }

  return (
    <div>
      <div className={styles.bgimage}>
        <div className={styles.elements}>
          <p className={styles.text}>Скоро начнем!</p>
          <div className={styles.avatarPerson}>
            <img className={styles.ava} src="/ava.png" alt="avatar" />
            <img className={styles.ava} src="/ava4.png" alt="avatar" />
            <img className={styles.ava} src="/ava3.png" alt="avatar" />
            <img className={styles.ava} src="/ava2.png" alt="avatar" />
          </div>
          <div className={styles.bar}>
            <div className={styles.gradientbar}></div>
          </div>
          <p className={styles.text}>
            Ждём остальных <br /> участников
          </p>
        </div>
      </div>
    </div>
  );
}
