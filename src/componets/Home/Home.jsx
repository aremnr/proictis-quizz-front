import React from 'react';
import Button from '@mui/material/Button';
import styles from './homestyles.module.css';
import { useNavigate } from 'react-router-dom';

export function Home(){
  const navigate = useNavigate(); // Инициализируем хук useNavigate

  const handleStart = () => {
    navigate('/wait/'); // Переход на страницу с вопросом id=1
  };
   return (
      <div>
        <div className={styles.bgimage}>
       <div className={styles.outercontainer}>
         <div className={styles.innercontainer}>
            <div className={styles.imagestack}>
               <img src="logo2.png" alt="Image 1" className={styles.image3} />
               <img src="Ellipse4.png" alt="Image 1" className={styles.image2}/>
               <img src="Ellipse3.png" alt="Image 1" className={styles.image1}/>
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
          />
        
        </div>
          
          {/* <Button
            variant="contained"
            color="secondary"
            className={styles.buttonstart}
          >
            Начать!
          </Button> */}

          <Button variant="contained"
           color="secondary"
           className={styles.buttonstart}
           onClick={handleStart}
           > Начать!</Button>
         </div>
         </div>
       </div>
       </div>
     </div>
   );
};
