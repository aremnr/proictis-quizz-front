import React, { useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import styles from "./done.module.css";
import Button from "@mui/material/Button";
import axios from "axios";

export function Done() {
  const { quiz_id } = useParams();
  const [gameUrl, setGameUrl] = useState(null);
  const location = useLocation();
  const maxQuestions = location.state?.maxQuestions; // Используем опциональную цепочку
  const navigate = useNavigate();
  const accessToken = localStorage.getItem("access_token");

  console.log("Получен quizId:", quiz_id);

  const handleViewQuiz = () => {
    // Передаем quizId и maxQuestions при навигации на ListOfQuest
    navigate(`/${quiz_id}/listofquest`, { state: { maxQuestions, quiz_id } });
  };

  const handleStartGame = () => {
    console.log("создаем игру: ", quiz_id);
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

        console.log("Переходим на куар:", quiz_id);
        console.log("Count of quest:", maxQuestions);
        const url = `${window.location.host}/quiz/${quiz_id}/game/${gameId}/qr`;
        setGameUrl(url);
        // navigate(`/quiz/${quiz_id}/game/${gameId}/qr`, {
        // state: { maxQuestions, quiz_id },
        // });
      })
      .catch((error) => {
        console.error("Ошибка при получении вопроса:", error);
      });
  };

  const handleReturnToEditor = () => {
    navigate("/welcome"); // Возвращаемся в главное меню
  };

  return (
    <div className={styles.bg}>
      <div className={styles.container}>
        <div>
          <Button
            variant="contained"
            color="secondary"
            className={styles.button}
            onClick={handleViewQuiz}
          >
            Просмотреть Quiz
          </Button>
        </div>
        <div>
          <Button
            variant="contained"
            color="secondary"
            className={styles.button}
            onClick={handleStartGame}
          >
            Начать игру
          </Button>
        </div>
        {gameUrl && <span>{gameUrl}</span>}
        <div>
          <Button
            variant="contained"
            color="secondary"
            className={styles.button}
            onClick={handleReturnToEditor}
          >
            В главное меню
          </Button>
        </div>
      </div>
    </div>
  );
}
