import styles from "./wait.module.css";
import React from "react";

export function Wait() {
  return (
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
            <div className={styles.gradientbar}></div>
          </div>
          <p className={styles.text}>
            Ждём остальных <br /> участников
          </p>
        </div>
      </div>
    </div>
  );
}
