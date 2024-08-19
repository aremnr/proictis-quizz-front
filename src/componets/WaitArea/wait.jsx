import styles from './wait.module.css';
import Button from '@mui/material/Button';
import { Timer } from '../Timer/Timer';
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
export function Wait(){
         const navigate = useNavigate(); // Инициализируйте navigate

      useEffect(() => {
         // Таймер, который сработает через 5 секунд (5000 миллисекунд)
         const timer = setTimeout(() => {
            navigate('/questions/1'); // Перейдите к первому вопросу
         }, 5000); // Установите нужное время в миллисекундах

         // Очистка таймера при размонтировании компонента
         return () => clearTimeout(timer);
      }, [navigate]);
   return(
      <div>
         <div className={styles.bgimage}>
         <div className={styles.elements}>
            <p className={styles.text}>Скоро начнем!</p>
            <div className={styles.avatarPerson}>
                        <img className={styles.ava} src="/ava.png" alt="avatar" />
                        <img className={styles.ava} src="/ava4.png" alt="avatar" />
                        <img className={styles.ava} src="/ava3.png" alt="avatar" />
                        <img className={styles.ava} src="/ava2.png" alt="avatar" />
                    </div>
            <div className={styles.bar}>
               <div class={styles.gradientbar}></div>
            </div>
            <p className={styles.text}>Ждём остальных <br /> участников</p>
         </div>
         </div>
      </div>
   )
}