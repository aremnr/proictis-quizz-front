import React, { useState, useEffect } from 'react';
import styles from './questionstyle.module.css';
import { Timer } from '../Timer/timer1/Timer';
import Button from '@mui/material/Button';
import mockQuestions from '../../../mocks/mocks';
import { useParams, useNavigate } from 'react-router-dom';


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
    const { id } = useParams();
    const navigate = useNavigate();
    const questionIndex = parseInt(id, 10) - 1; // Преобразуем ID в индекс массива
    const currentQuestion = mockQuestions[questionIndex];

    const [selectedAnswer, setSelectedAnswer] = useState(null);

    // Сбрасываем выбранный ответ при изменении вопроса
    useEffect(() => {
        setSelectedAnswer(null);
    }, [id]); // Зависимость от id, чтобы сбрасывать состояние при изменении вопроса

    if (!currentQuestion) {
        return <p>Вопрос не найден.</p>;
    }

    const handleAnswerClick = (index) => {
        setSelectedAnswer(index);
    };

    const handleTimerEnd = () => {
        // Переходим на страницу с ответом для текущего вопроса
        navigate(`answer/${id}`);
    };

    return(
        
        <div>
            <div className={styles.bgimage}>
                <div className={styles.outerContainer}>
                    <div className={styles.innerContainer}>
                        <div className={styles.elements}>
                            <p className={styles.question}>{currentQuestion.question}</p>
                            <div className={styles.questPhoto}>
                                <img className={styles.photo} src="/gubka.jpg" alt="Gubka" />
                            </div>
                            <div className={styles.timerpadding1}><Timer key={id} seconds={5} onTimerEnd={handleTimerEnd} /></div>
                            <div className={styles.answers}>
                            {currentQuestion.answers.map((answer, index) => (
                                    <Button
                                        variant="contained"
                                        color="secondary"
                                        key={index}
                                        className={`${styles.answer} ${selectedAnswer === index ? styles.selected : ''}`}
                                        onClick={() => handleAnswerClick(index)}
                                    >
                                        {answer}
                                    </Button>
                                    
                                ))}
                            </div>
                            
                    </div>
                    <div className={styles.avatarperson}>
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