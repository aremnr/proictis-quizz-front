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
  const [isBlocked, setIsBlocked] = useState(1);
  const [ws, setWs] = useState(null);
  const [answer, setAnswer] = useState(null);
  const [gameMessage, setGameMessage] = useState("Начать игру!");
  const [connectedUsers, setConnectedUsers] = useState([]);
  const { quiz_id, game_id } = useParams();
  const accessToken = localStorage.getItem("access_token");
  const maxQuestions = location.state?.maxQuestions;

  useEffect(() => {
    const urlToEncode = `${window.location.host}/quiz/${quiz_id}/game/${game_id}`;
    console.log("decoded url: ", urlToEncode);

    qr.toDataURL(urlToEncode, function (err, url) {
      console.log("encoded url: ", url);
      setQrcode(url);
    });

    const ws = new WebSocket(`wss://quiz.dev.schtil.com/game/${game_id}`);
    setWs(ws);
  }, [quiz_id, game_id]);

  const handleBackClick = () => {
    // Передаем maxQuestions и quizId при навигации назад
    navigate(`/${quiz_id}/done`, { state: { maxQuestions, quiz_id } });
  };

  const handleSubmit = () => {
    setAnswer(null);
    setIsBlocked(isBlocked === 0 ? 1 : 0);
    if (gameMessage === "Начать игру!") {
      console.log("game is started!");
      const headers = { type: "game" };
      ws.send(JSON.stringify({ headers }));
      setGameMessage("Следующий вопрос");
      return;
    } else if (gameMessage === "Следующий вопрос") {
      console.log("next answer!");
      const headers = { type: "game" };
      ws.send(JSON.stringify({ headers }));
      return;
    } else if (gameMessage === "Закончить игру!") {
      setIsBlocked(2);
      console.log("[qr] кнопка закончить игру!");
      const headers = { type: "end_game" };
      ws.send(JSON.stringify({ headers }));
      return;
    }
  };

  const handleGetAnswer = () => {
    setIsBlocked(isBlocked === 0 ? 1 : 0);
    const headers = { type: "get_answer" };
    ws.send(JSON.stringify({ headers }));
    console.log("game get answers!");
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

    if (
      event.data === "results" ||
      event.data.startsWith("empty") ||
      event.data === "start_results" ||
      event.data === "end_results"
    ) {
      return;
    }

    if (event.data === "end_game") {
      console.log("end game event!");
      setGameMessage("Закончить игру!");
      return;
    }

    const message = JSON.parse(event.data);
    console.log("parsed: ", message);

    if (message.header && gameMessage === "Закончить игру!") {
      return;
    }
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
            disabled={isBlocked === 0 || isBlocked === 2}
          >
            {gameMessage}
          </Button>
          <Button
            variant="contained"
            color="secondary"
            className={styles.buttonstart}
            onClick={handleGetAnswer}
            disabled={isBlocked === 1 || isBlocked === 2}
          >
            Показать ответ нам!
          </Button>
          {answer && <div>Ответ на вопрос: {answer}</div>}
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
