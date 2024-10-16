import styles from "./winner.module.css";
import React from "react";
import Button from "@mui/material/Button";
import RankingItem from "./ranking/RankingItem";
import { useLocation, useNavigate, useParams } from "react-router-dom";

export function Winner() {
  const { quiz_id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const users = location.state.users;

  const handleResults = () => {
    navigate(`/quiz/${quiz_id}/leaderboard`, { state: { users } });
  };

  return (
    <div>
      <div className={styles.bgimage}>
        <div className={styles.outerContainer}>
          <div className={styles.innerContainer}>
            <div className={styles.elements}>
              <img src="/crown.png" alt="Image" className={styles.avatar1} />
              <p>Победитель!</p>
              <img src="/ava4.png" alt="Image" className={styles.avatar} />
              <p>
                {users[0] !== undefined ? users[0].username : "Неизвестный"}
              </p>
            </div>
            {users[1] !== undefined && (
              <div className={styles.RankingContainer}>
                <RankingItem
                  imageUrl="/2ndplace.png"
                  position={2}
                  name={users[1].username}
                />
              </div>
            )}
            {users[2] !== undefined && (
              <div className={styles.RankingContainer}>
                <RankingItem
                  imageUrl="/3rdplace.png"
                  position={3}
                  name={users[2].username}
                />
              </div>
            )}
            <div className={styles.buttonresults}>
              <Button
                variant="contained"
                color="secondary"
                className={styles.results}
                onClick={handleResults}
              >
                {" "}
                Итоги
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
