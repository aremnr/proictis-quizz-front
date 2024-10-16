import styles from "./addquiz.module.css";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Checkbox, FormControlLabel, TextField } from "@mui/material";
import axios from "axios"; // Импорт axios

export function AddQuiz() {
  const [time, setTime] = useState(""); // Таймер как строка
  const [maxQuestions, setMaxQuestions] = useState(""); // Количество вопросов как строка
  const [isTimerEnabled, setIsTimerEnabled] = useState(true); // Включен ли таймер

  const navigate = useNavigate();

  const handleSubmit = () => {
    if (
      !maxQuestions ||
      maxQuestions === "0" ||
      (isTimerEnabled && (!time || time === "0"))
    ) {
      alert(
        "Пожалуйста, заполните количество вопросов и настройте таймер или отключите его."
      );
      return;
    }

    // Check if the timer is enabled or disabled
    console.log(isTimerEnabled ? "Таймер включен" : "Таймер отключен");

    navigate("/aboutquiz", {
      state: {
        maxQuestions,
        time: isTimerEnabled ? time : 0, // Передаем таймер только если он включен
      },
    });
  };

  const handleBackClick = () => {
    navigate(-1);
  };

  return (
    <div className={styles.bg}>
      <div className={styles.OuterContainer}>
        <div className={styles.InnerContainer}>
          <h2 className={styles.header}>Создание quiz-игры</h2>

          <p className={styles.timerHint}>
            Укажите время (максимум 120 секунд)
          </p>

          <p className={styles.timerLabel}>Таймер</p>
          <div className={styles.timerContainer}>
            <TextField
              className={styles.timerInput}
              type="number"
              variant="outlined"
              value={time}
              onChange={(e) => {
                const value = e.target.value;
                if (
                  value === "" ||
                  (Number(value) >= 0 && Number(value) <= 120)
                ) {
                  setTime(value);
                }
              }} // Позволяем удалять значение и ограничиваем до 120 минут
              disabled={!isTimerEnabled}
              inputProps={{ min: 0, max: 120 }}
              sx={{
                "& .MuiOutlinedInput-root": {
                  borderRadius: "30px",
                  backgroundColor: "#D9D9D9",
                  border: "none",
                  width: "70%",
                },
                "& .MuiOutlinedInput-notchedOutline": {
                  border: "none",
                },
              }}
            />
          </div>

          <div>
            <FormControlLabel
              control={
                <Checkbox
                  checked={!isTimerEnabled}
                  onChange={() => setIsTimerEnabled(!isTimerEnabled)}
                />
              }
              label="Таймер не нужен"
            />
          </div>

          <div>
            <p className={styles.questionsLabel}>Количество вопросов</p>

            <TextField
              className={styles.timerInput}
              type="number"
              variant="outlined"
              value={maxQuestions}
              onChange={(e) => {
                const value = e.target.value;
                if (
                  value === "" ||
                  (Number(value) >= 1 && Number(value) <= 20)
                ) {
                  setMaxQuestions(value);
                }
              }} // Позволяем удалять значение и ограничиваем до 20 вопросов
              inputProps={{ min: 1, max: 20 }}
              sx={{
                "& .MuiOutlinedInput-root": {
                  borderRadius: "30px",
                  backgroundColor: "#D9D9D9",
                  border: "none",
                  width: "70%",
                },
                "& .MuiOutlinedInput-notchedOutline": {
                  border: "none",
                },
              }}
            />
            <p className={styles.timerHint}>(макс. 20)</p>
          </div>

          <div>
            <Button
              variant="contained"
              color="secondary"
              className={styles.buttonstart}
              onClick={handleSubmit}
            >
              Перейти к созданию квиза
            </Button>
          </div>

          <button className={styles.backButton} onClick={handleBackClick}>
            &#8592;
          </button>
        </div>
      </div>
    </div>
  );
}
