import React, { useState } from "react";
import Button from "@mui/material/Button";
import styles from "./adminreg.module.css";
import { useNavigate } from "react-router-dom";
import axios from "axios"; // Импортируем axios
import MD5 from "crypto-js/md5";

export function AdminReg() {
  const navigate = useNavigate(); // Хук для навигации
  const [passwordShown, setPasswordShown] = useState(false);
  const [username, setUsername] = useState(""); // Состояние для имени пользователя
  const [password, setPassword] = useState(""); // Состояние для пароля
  const [referralCode, setReferralCode] = useState(""); // Состояние для реферального кода
  const [passwordError, setPasswordError] = useState("");

  const togglePasswordVisibility = () => {
    setPasswordShown(!passwordShown);
  };

  const handleBackClick = () => {
    navigate(-1); // Возвращаемся на предыдущую страницу
  };

  const handlePasswordChange = (event) => {
    const newPassword = event.target.value;
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
    if (!username || !password || !referralCode) {
      alert("Пожалуйста, заполните все поля."); // Выводим предупреждение
      return;
    }

    console.log(MD5(username).toString());
    axios
      .post(
        "https://quiz.dev.schtil.com/register",
        {
          username: username,
          password: password,
          email: MD5(username).toString() + "@test.com",
          referral_token: referralCode,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then(function (response) {
        console.log(response.data);
        navigate("/Welcome");
      })
      .catch(function (error) {
        alert("Неверный реферальный код");
        console.log(error);
        // console.log(error.response.data.detail);
        // alert(error.response.data.detail);
      });
  };

  return (
    <div>
      <div className={styles.bg}>
        <div className={styles.OuterContainer}>
          <div className={styles.InnerContainer}>
            <h2 className={styles.header}>Регистрация</h2>
            <div className={styles.paddingtop}>
              <label className={styles.label}>Имя пользователя</label>
              <input
                type="text"
                className={styles.inputStyle}
                value={username}
                onChange={(e) => setUsername(e.target.value)} // Обработчик изменения
              />

              <label className={styles.label}>Придумайте пароль:</label>
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
              {passwordError && ( // Условное отображение сообщения об ошибке
                <div className={styles.errorMessage}>{passwordError}</div>
              )}

              <label className={styles.label}>Реферальный код</label>
              <input
                type="text"
                className={styles.inputStyle}
                value={referralCode}
                onChange={(e) => setReferralCode(e.target.value)} // Обработчик изменения
              />

              <div className={styles.paddingbottom}>
                <Button
                  variant="contained"
                  color="secondary"
                  className={styles.buttonstart}
                  onClick={handleSubmit} // Обработчик клика по кнопке
                >
                  Создать аккаунт
                </Button>
              </div>
            </div>
          </div>{" "}
          <button className={styles.backButton} onClick={handleBackClick}>
            &#8592;
          </button>
        </div>
      </div>
    </div>
  );
}
