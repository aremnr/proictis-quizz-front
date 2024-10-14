import React, { useEffect, useState } from "react";
import styles from "./qr.module.css";
import qr from "qrcode";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import { Button } from "@mui/material";

export let users = [];
export let answerText = "";

export function Qr() {
  const location = useLocation();
  const navigate = useNavigate();
  const [qrcode, setQrcode] = useState("");
  const [ws, setWs] = useState(null);
  const [answer, setAnswer] = useState(null);
  const [connectedUsers, setConnectedUsers] = useState([]);
  const { quiz_id } = useParams();
  const productionPrefix = "https://quiz.dev.schtil.com/log";
  const localPrefix = "http://localhost:3000";
  const accessToken = localStorage.getItem("access_token");
  const maxQuestions = location.state?.maxQuestions;

  useEffect(() => {
    axios
      .get(`https://quiz.dev.schtil.com/create_game`, {
        params: {
          quiz_id: quiz_id,
        },
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((response) => {
        console.log(response.data);
        const gameId = response.data.game_id;

        const urlToEncode = `${localPrefix}/quiz/${quiz_id}/game/${gameId}`;
        console.log("decoded url: ", urlToEncode);

        qr.toDataURL(urlToEncode, function (err, url) {
          console.log("encoded url: ", url);
          setQrcode(url);
        });

        const ws = new WebSocket(`wss://quiz.dev.schtil.com/game/${gameId}`);
        setWs(ws);
      })
      .catch((error) => {
        console.error("Ошибка при получении вопроса:", error);
      });
  }, [quiz_id, accessToken]);

  const handleBackClick = () => {
    // Передаем maxQuestions и quizId при навигации назад
    navigate(`/${quiz_id}/done`, { state: { maxQuestions, quiz_id } });
  };

  const handleSubmit = () => {
    const headers = { type: "game" };
    ws.send(JSON.stringify({ headers }));
    console.log("game is started!");
    // navigate("/AddQuestion");
  };

  const handleGetAnswer = () => {
    const headers = { type: "get_answer" };
    ws.send(JSON.stringify({ headers }));
    console.log("game get answers!");
  };

  const handleEndGame = () => {
    const headers = { type: "end_game" };
    ws.send(JSON.stringify({ headers }));
    console.log("game end!");
  };

  if (!ws) {
    return <p>Загрузка...</p>;
  }

  ws.onopen = () => {
    console.log("WebSocket соединение установлено");
    ws.send(accessToken);
    // setIsConnected(true); // Обновляем состояние при успешном подключении
  };

  ws.onmessage = (event) => {
    console.log("event: ", event);
    console.log("Сообщение от сервера:", event.data);

    if (event.data === "results" || event.data === "end_game") {
      return;
    }

    const message = JSON.parse(event.data);
    console.log("parsed: ", message);

    if (message.header === "users") {
      users.push({
        username: message.username,
        points: message.points,
      });
      setConnectedUsers([...users]);
    } else if (message.header === "user_update") {
      const user = users.find((u) => u.username === message.username);

      if (user) {
        user.points = message.points;
        console.log(`User ${user.username} now has ${user.points} points`);
        console.log(users);
        setConnectedUsers([...users]);
      } else {
        console.log("User not found");
      }
      setConnectedUsers(users);
    } else if (message.header === "Answer_check") {
      setAnswer(message.Answer);
      answerText = message.Answer;
    }
    // setMessages((prevMessages) => [...prevMessages, event.data]);
  };

  ws.onclose = () => {
    console.log("WebSocket соединение закрыто");
  };

  return (
    <div className={styles.bg}>
      <div className={styles.OuterContainer}>
        {/* Контейнер для QR-кода и кнопки */}
        <div className={styles.qrButtonContainer}>
          <img className={styles.qr} src={qrcode} alt="QR Code" />
          <Button
            variant="contained"
            color="secondary"
            className={styles.buttonstart}
            onClick={handleSubmit}
          >
            Начать игру!
          </Button>
          <Button
            variant="contained"
            color="secondary"
            className={styles.buttonstart}
            onClick={handleGetAnswer}
          >
            Показать ответ нам!
          </Button>
          {answer && <div>Ответ на вопрос: {answer}</div>}
          <Button
            variant="contained"
            color="secondary"
            className={styles.buttonstart}
            onClick={handleEndGame}
          >
            Закончить игру для петушни!
          </Button>
          {/* Контейнер для списка пользователей */}
          <div className={styles.userListContainer}>
            <h3>Список подключившихся пользователей:</h3>
            <ul className={styles.userList}>
              {connectedUsers.map((user, idx) => (
                <li key={idx}>
                  {user.username}: {user.points}
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className={styles.backButtonContainer}>
          <button className={styles.backButton} onClick={handleBackClick}>
            &#8592;
          </button>
        </div>
      </div>
    </div>
  );
}
