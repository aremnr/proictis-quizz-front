import React, {useState} from 'react';
import Button from '@mui/material/Button';
import styles from './homestyles.module.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export function Home(){
  // axios.get('https://quiz.dev.schtil.com/quiz/aebe766f-e234-44d1-964f-a20622e55155')
  //   .then(function (response) {
  //     console.log(response);
  //   })
  //   .catch(function (error) {
  //     console.log(error);
  //   })

  const [username, setUsername] = useState(''); // Состояние для имени пользователя
    const navigate = useNavigate(); // Инициализируем хук useNavigate

    const handleStart = () => {
        // Проверка, что имя пользователя заполнено
        if (!username) {
            alert('Пожалуйста, введите ваше имя.'); // Выводим предупреждение
            return;
        }

        // Если имя пользователя заполнено, переходим на другую страницу
        navigate('/wait/'); // Переход на страницу с вопросом id=1
    };
  return (
    <div>
        <div className={styles.bgimage}>
            <div className={styles.outercontainer}>
                <div className={styles.innercontainer}>
                    <div className={styles.imagestack}>
                        <img src="logo2.png" alt="Image 1" className={styles.image3} />
                        <img src="Ellipse4.png" alt="Image 1" className={styles.image2} />
                        <img src="Ellipse3.png" alt="Image 1" className={styles.image1} />
                    </div>
                    <div className={styles.content}>
                        <p className={styles.title}>название квиза</p>
                        <p className={styles.question1}>Как вас зовут?</p>
                        
                        <div className={styles.center}>
                            <input 
                                type="text" 
                                id="nameInput" 
                                placeholder="имя пользователя" 
                                className={styles.ovalinput} 
                                value={username} // Привязываем значение к состоянию
                                onChange={(e) => setUsername(e.target.value)} // Обработчик изменения
                            />
                        </div>

                        <Button 
                            variant="contained"
                            color="secondary"
                            className={styles.buttonstart}
                            onClick={handleStart} // Обработчик клика по кнопке
                        > 
                            Начать!
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    </div>
);
};