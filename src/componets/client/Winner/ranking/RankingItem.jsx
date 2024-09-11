import React from 'react';
import styles from './RankingItem.module.css'; // Не забудьте создать этот файл для стилей

const RankingItem = ({ imageUrl, position, name }) => {
   return (
      <div className={styles.rankingitem}>
        <img src={imageUrl} alt={`${position} место`} className={styles.rankingimage} />
        <span className={styles.rankingtext}>
          <strong>{`${position} место`}</strong>
          {`: ${name}`}
        </span>
      </div>
    );
};

export default RankingItem;