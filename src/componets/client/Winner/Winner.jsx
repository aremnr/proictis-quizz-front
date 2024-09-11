import styles from './winner.module.css';
import React from 'react';
import Button from '@mui/material/Button';
import RankingItem from './ranking/RankingItem';

export function Winner(){
   return(
      <div>
         <div className={styles.bgimage}>
         <div className={styles.outerContainer}>
                <div className={styles.innerContainer}>
                    <div className={styles.elements}>
                    <img src="/crown.png" alt="Image" className={styles.avatar1}/>
                    <p>Победитель!</p>
                    <img src="/ava4.png" alt="Image" className={styles.avatar}/>
                    <p>Гейзенберг</p>
                    </div>
                    <div className={styles.RankingContainer}>
                     <RankingItem 
                     imageUrl="/2ndplace.png" 
                     position={2} 
                     name="Потапыч"/>
                     </div>
                     <div className={styles.RankingContainer}><RankingItem imageUrl="/3rdplace.png"
                     position ={3}
                     name="Бэтмен"/>
                     </div>
                     <div className={styles.buttonresults}><Button variant="contained"
                        color="secondary"
                        className={styles.results}> Итоги</Button>
                     </div>
                </div>
            </div>
            </div>
      </div>
   );
}