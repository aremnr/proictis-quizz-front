import React from 'react';

import { Timer } from '../Timer/Timer';

import './questionstyle.css';

export function Question () {
    return(
        <div>
            <div className='outer-container2'>
                <div className='inner-container2'>
                    <div className='elements'>
                        <p className='question'>Кто проживает на дне океана?</p>
                    <div className='questPhoto'>
                        <img className="photo" src="/gubka.jpg" alt="Gubka" />
                    </div>
                    <Timer seconds={60} />
                    <div className='answers'>
                        <input className="inputText" type="text" placeholder="ваш ответ" />
                    </div>
                    <div className='button1'>
                        <button className="toAnswer">ответить</button>
                    </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
