import React from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import styles from "./done.module.css";
import Button from "@mui/material/Button";

export function Done() {
  const { quiz_id } = useParams();
  const location = useLocation();
  const maxQuestions = location.state?.maxQuestions; // Используем опциональную цепочку
  const navigate = useNavigate();

  console.log("Получен quizId:", quiz_id);

  const handleViewQuiz = () => {
    // Передаем quizId и maxQuestions при навигации на ListOfQuest
    navigate(`/${quiz_id}/listofquest`, { state: { maxQuestions, quiz_id } });
  };

  const handleStartGame = () => {
    console.log("Переходим на куар:", quiz_id);
    console.log("Count of quest:", maxQuestions);
    navigate(`/${quiz_id}/qr`, { state: { maxQuestions, quiz_id } });
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
