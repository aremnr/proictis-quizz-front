import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './done.module.css'
import Button from '@mui/material/Button';
export function Done() {
  const navigate = useNavigate();

  const handleViewQuiz = () => {
    // Логика для просмотра квиза
    console.log("Viewing Quiz");
  };

  const handleStartGame = () => {
    // Логика для начала игры
    console.log("Starting Game");
  };

  const handleReturnToEditor = () => {
    navigate('/editor'); // Перейти к редактору
  };

  return (
    <div className={styles.bg}>
      <div>
        <div><Button 
        variant="contained"
         color="secondary"
         className={styles.button}
         onClick={handleReturnToEditor}>вернуться в редактор</Button></div>
        <div><Button 
        variant="contained"
        color="secondary"
        className={styles.button}
        onClick={handleViewQuiz}>просмотреть Quiz</Button></div>
        <div><Button 
        variant="contained"
        color="secondary"
        className={styles.button}
        onClick={handleStartGame}>начать игру</Button></div>
      </div>
    </div>
  );
}
