import React, { useState } from "react";
import Button from "@mui/material/Button";
import styles from "./adminlog.module.css";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";

export function AdminLog() {
  const navigate = useNavigate(); // Хук для навигации
  const [passwordShown, setPasswordShown] = useState(false);
  const [username, setUsername] = useState(""); // Состояние для имени пользователя
  const [password, setPassword] = useState(""); // Состояние для пароля
  const [passwordError, setPasswordError] = useState("");

  const togglePasswordVisibility = () => {
    setPasswordShown(!passwordShown);
  };

  const handlePasswordChange = (event) => {
    const newPassword = event.target.value;
    // Регулярное выражение для проверки ввода только английских букв и цифр
    const regex = /^[a-zA-Z0-9]*$/;

    if (regex.test(newPassword) || newPassword === "") {
      setPassword(newPassword);
      setPasswordError(""); // Сбросить ошибку при корректном вводе
    } else {
      setPasswordError(
        "Пароль должен содержать только английские буквы и цифры."
      );
    }
  };

  const handleSubmit = () => {
    // Проверка, что все поля заполнены
    if (!username || !password) {
      alert("Пожалуйста, заполните все поля."); // Выводим предупреждение
      return;
    }

    axios
      .post(
        "https://quiz.dev.schtil.com/login",
        {
          username: username,
          password: password,
        },
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        }
      )
      .then(function (response) {
        console.log(response.data.access_token);
        localStorage.setItem("access_token", response.data.access_token);
        navigate("/Welcome");
      })
      .catch((error) => {
        if (error.response) {
          console.error("Error response:", error.response.data);
          alert("Ошибка: " + error.response.data);
        } else if (error.request) {
          console.error("Error request:", error.request);
          alert("Ошибка: Сервер не отвечает.");
        } else {
          console.error("Error message:", error.message);
          alert("Ошибка: " + error.message);
        }
        console.error("Full error object:", error);
      });
  };

  return (
    <div>
      <div className={styles.bg}>
        <div className={styles.OuterContainer}>
          <div className={styles.InnerContainer}>
            <h2 className={styles.header}>Авторизация</h2>

            <div className={styles.container}>
              <label className={styles.label}>Имя пользователя</label>
              <input
                type="text"
                className={styles.inputStyle}
                value={username}
                onChange={(e) => setUsername(e.target.value)} // Обработчик изменения
              />

              <label className={styles.label}>Пароль:</label>
              <div className={styles.passwordContainer}>
                <input
                  type={passwordShown ? "text" : "password"}
                  className={styles.inputStyle}
                  value={password}
                  onChange={handlePasswordChange} // Обработчик изменения пароля
                />
                <span
                  className={styles.eyeIcon}
                  onClick={togglePasswordVisibility}
                >
                  {passwordShown ? (
                    <i className="fas fa-eye-slash"></i>
                  ) : (
                    <i className="fas fa-eye"></i>
                  )}
                </span>
              </div>
              {passwordError && (
                <div className={styles.errorMessage}>{passwordError}</div>
              )}
            </div>

            <div className={styles.paddingbottom}>
              <Button
                variant="contained"
                color="secondary"
                className={styles.buttonstart}
                onClick={handleSubmit}
              >
                Войти в аккаунт
              </Button>
            </div>

            {/* Добавляем фразу с ссылкой */}
            <div className={styles.createAccountText}>
              Нет аккаунта?{" "}
              <Link to="/adminreg" className={styles.createAccountLink}>
                Создайте его!
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
