import React from 'react';
import styles from './questionstyle.module.css';
import { Timer } from '../Timer/Timer';
import Button from '@mui/material/Button';

//  export function Questions(){
//     return(
//         <div className="field">
//             <div className="elements">
//                 <p className="question">Кто проживает на дне океана?</p>
//                 <div className="questPhoto">
//                     <img className="photo" src="gubka.jpg" alt="Gubka" />
//                 </div>
//                 <div className="timer">
//                     <p className="seconds">60c</p>
//                 </div>
                // <div className="answers">
                //     <button className="answer">Спанч Боб</button>
                //     <button className="answer">Хлебная жаба</button>
                //     <button className="answer">Что?</button>
                //     <button className="answer">Улитка</button>
                // </div>
                // <div className="avatarPerson">
                //     <img className="ava" src="ava.png" alt="avatar" />
                //     <img className="ava" src="ava2.png" alt="avatar" />
                //     <img className="ava" src="ava3.png" alt="avatar" />
                //     <img className="ava" src="ava4.png" alt="avatar" />
                //     <img className="ava" src="ava5.png" alt="avatar" />
                // </div>
//             </div>
//         </div>
//     )

// };

export function Questions(){
    return(
        <div>
            <div className={styles.outerContainer}>
                <div className={styles.innerContainer}>
                    <div className={styles.elements}>
                        <p className={styles.question}>Кто проживает на дне океана?</p>
                    <div className={styles.questPhoto}>
                        <img className={styles.photo} src="/gubka.jpg" alt="Gubka" />
                    </div>
                    <div className={styles.timerpadding}><Timer seconds={60} /></div>
                    <div className={styles.answers}>
                        <button className={styles.answer}>Спанч Боб</button>
                        <button className={styles.answer}>Хлебная жаба</button>
                        <button className={styles.answer}>Что?</button>
                        <button className={styles.answer}>Улитка</button>
                    </div>
                    <div className={styles.avatarPerson}>
                        <img className={styles.ava} src="/ava2.png" alt="avatar" />
                        <img className={styles.ava} src="/ava3.png" alt="avatar" />
                        <img className={styles.ava} src="/ava.png" alt="avatar" />
                        <img className={styles.ava} src="/ava5.png" alt="avatar" />
                        <img className={styles.ava} src="/ava4.png" alt="avatar" />
                    </div>
                    </div>
                </div>
            </div>
        </div>
    );
}