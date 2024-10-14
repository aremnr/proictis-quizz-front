import React, { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import styles from "./homestyles.module.css";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

export let ws;
export let quiz;
export let currentQuestion;
export let currentUser;
export let users;

export function Home() {
  const [quizData, setQuizData] = useState(null);
  const [username, setUsername] = useState(""); // Состояние для имени пользователя
  const navigate = useNavigate(); // Инициализируем хук useNavigate
  const { quiz_id, game_id } = useParams();

  useEffect(() => {
    const getQuizById = () => {
      axios
        .get(`https://quiz.dev.schtil.com/quiz/${quiz_id}`)
        .then((response) => {
          console.log(response.data);
          setQuizData(response.data);
          quiz = response.data;
        })
        .catch((error) => {
          console.error("Ошибка при получении квиза:", error);
        });
    };

    getQuizById();
  }, [quiz_id]);

  useEffect(() => {
    ws = new WebSocket(`wss://quiz.dev.schtil.com/game/${game_id}`);
    ws.onopen = () => {
      console.log("WebSocket соединение установлено");
      // setIsConnected(true); // Обновляем состояние при успешном подключении
    };
  }, [game_id]);

  if (!quizData || !ws) {
    return <p>Загрузка...</p>;
  }

  if (ws) {
    ws.onmessage = (event) => {
      console.log("event: ", event);

      if (event.data === "end_game") {
        // navigate(`/quiz/${quiz_id}/winner`);
        return;
      }

      const parsed = JSON.parse(event.data);
      console.log("parsed: ", parsed);
      console.log("header: ", parsed["header"]);

      if (!parsed[`header`]) {
        currentQuestion = parsed;
        navigate(`/quiz/${quiz_id}/question/${currentQuestion.id}`, {
          state: { data: currentQuestion },
        });
      } else if (parsed["header"] === "users") {
        currentUser = parsed;
      } else if (parsed.header === "check_answer") {
        navigate(`/quiz/${quiz_id}/question/${currentQuestion.id}/answer`, {
          state: { answerText: parsed.Answer },
        });
      }
    };
  }

  ws.onclose = () => {
    console.log("WebSocket соединение закрыто");
  };

  const handleStart = () => {
    if (!username) {
      alert("Пожалуйста, введите ваше имя.");
      return;
    }

    ws.send(username);

    navigate(`/quiz/${quiz_id}/wait`, { state: quizData });
  };
  return (
    <div>
      <div className={styles.bgimage}>
        <div className={styles.outercontainer}>
          <div className={styles.innercontainer}>
            <div className={styles.imagestack}>
              <img src="/logo2.png" alt="php 1" className={styles.image3} />
              <img src="/Ellipse4.png" alt="php 2" className={styles.image2} />
              <img src="/Ellipse3.png" alt="php 3" className={styles.image1} />
            </div>
            <div className={styles.content}>
              <p className={styles.title}>{quizData.name}</p>
              <p className={styles.question1}>Как вас зовут?</p>

              <div className={styles.center}>
                <input
                  type="text"
                  id="nameInput"
                  placeholder="имя пользователя"
                  className={styles.ovalinput}
                  value={username} // Привязываем значение к состоянию
                  onChange={(e) => setUsername(e.target.value)} // Обработчик изменения
                />
              </div>

              <Button
                variant="contained"
                color="secondary"
                className={styles.buttonstart}
                onClick={handleStart} // Обработчик клика по кнопке
              >
                Начать!
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
