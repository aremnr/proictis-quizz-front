import React, { useState } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import styles from "./welcome.module.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export function Welcome() {
  const navigate = useNavigate();
  const [openModal, setOpenModal] = useState(false);
  const [referralCode, setReferralCode] = useState("");

  const handleCreateQuiz = () => {
    navigate("/AddQuiz");
  };

  const handlePreviousQuizzes = () => {
    navigate("/PreviousQuiz");
  };

  const handleCreateReferralCode = () => {
    const accessToken = localStorage.getItem("access_token");
    axios
      .post(
        "https://quiz.dev.schtil.com/create_referral",
        {},
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            Authorization: `Bearer ${accessToken}`,
          },
        }
      )
      .then(function (response) {
        setReferralCode(response.data.referral);
        setOpenModal(true);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const copyToClipboard = () => {
    navigator.clipboard
      .writeText(referralCode)
      .then(() => {
        alert("Код скопирован в буфер обмена!");
      })
      .catch((err) => {
        console.error("Ошибка при копировании кода: ", err);
      });
  };

  return (
    <div className={styles.bg}>
      <div className={styles.OuterContainer}>
        <div className={styles.InnerContainer}>
          <div className={styles.avatarContainer}>
            <img src="/ava5.png" alt="Avatar" className={styles.avatar} />
          </div>
          <h2 className={styles.header}>Здравствуйте!</h2>
          <p className={styles.subText}>Что хотите сделать?</p>
          <div className={styles.buttonContainer}>
            <div>
              <Button
                variant="contained"
                color="secondary"
                onClick={handleCreateQuiz}
                className={styles.button}
              >
                Создать квиз
              </Button>
            </div>
            <Button
              variant="contained"
              color="secondary"
              onClick={handlePreviousQuizzes}
              className={styles.button}
            >
              Предыдущие квиз игры
            </Button>
            <Button
              variant="contained"
              color="secondary"
              onClick={handleCreateReferralCode}
              className={styles.button}
            >
              Создать реферальный код
            </Button>
          </div>
          <p className={styles.subText}>
            <span>
              <img className={styles.referralIcon} src="circle.png" alt="" />
            </span>
            Реферальный код нужен для регистрации нового администратора
          </p>
        </div>
      </div>

      {openModal && <div className={styles.modalBackdrop} />}

      {/* Модальное окно */}
      <Dialog
        open={openModal}
        onClose={handleCloseModal}
        maxWidth="lg"
        fullWidth
        PaperProps={{
          style: { borderRadius: "40px" }, // Установите радиус скругления для всего окна
        }}
      >
        <DialogTitle style={{ textAlign: "center" }}>
          Ваш реферальный код
        </DialogTitle>
        <DialogContent>
          <div
            style={{
              backgroundColor: "white",
              padding: "20px",
              borderRadius: "30px",
              textAlign: "center",
              cursor: "pointer",
              userSelect: "none",
            }}
            onClick={copyToClipboard}
          >
            <h3 style={{ fontSize: "30px", marginBottom: "56px" }}>
              {referralCode}
            </h3>
            <p
              style={{
                fontSize: "30px",
                marginTop: "8px",
                fontFamily: "ZenMaruGothic",
              }}
            >
              Нажмите на код для копирования!
            </p>
          </div>
        </DialogContent>
        <div style={{ textAlign: "center" }}>
          <Button
            onClick={handleCloseModal}
            style={{ backgroundColor: "#ffffff", color: "black" }} // Замените цвет на желаемый
          >
            Назад
          </Button>
        </div>
      </Dialog>
    </div>
  );
}
