import styles from './wait.module.css';
import React from 'react';
import Button from '@mui/material/Button';
import { Timer } from '../Timer/Timer';

export function Wait(){
   return(
      <div>
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
   )
}