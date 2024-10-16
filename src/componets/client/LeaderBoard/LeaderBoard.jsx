import React from "react";
import styles from "./Leaderboard.module.css"; // Добавим стили
import { useLocation } from "react-router-dom";

export function Leaderboard() {
  const location = useLocation();
  const users = location.state.users;

  return (
    <div className={styles.bgimage}>
      <div className={styles.outerContainer}>
        <div className={styles.container}>
          <h2>Все игроки</h2>
          <table>
            <tbody>
              {users.map((player, idx) => (
                <tr key={idx}>
                  <td>
                    {player.username} место: {idx + 1}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
