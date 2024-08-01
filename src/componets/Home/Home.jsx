import React from 'react';
import Button from '@mui/material/Button';
import './homestyles.css';

export function Home(){
   return (
      <div>
       <div className='outer-container'>
         <div className='inner-container'>
            <div className="image-stack">
               <img src="logo2.png" alt="Image 1" className="image3" />
               <img src="Ellipse4.png" alt="Image 1" className="image2"/>
               <img src="Ellipse3.png" alt="Image 1" className="image1"/>
            </div>
         <div className="content">
          <p className="title">название квиза</p>
          <p className="question1">Как вас зовут?</p>
          
          <div className="center">
          <input 
            type="text" 
            id="nameInput" 
            placeholder="имя пользователя" 
            className="oval-input" 
          />
        
        </div>
          
          <Button
            variant="contained"
            color="secondary"
            className="buttonstart"
          >
            Начать!
          </Button>
         </div>
         </div>
       </div>
     </div>
   );
};
