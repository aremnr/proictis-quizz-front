export function Questions(){
    return(
        <div className="field">
            <div className="elements">
                <p className="question">Кто проживает на дне океана?</p>
                <div className="questPhoto">
                    <img className="photo" src="gubka.jpg" alt="Gubka" />
                </div>
                <div className="timer">
                    <p className="seconds">60c</p>
                </div>
                <div className="answers">
                    <button className="answer">Спанч Боб</button>
                    <button className="answer">Хлебная жаба</button>
                    <button className="answer">Что?</button>
                    <button className="answer">Улитка</button>
                </div>
                <div className="avatarPerson">
                    <img className="ava" src="ava.png" alt="avatar" />
                    <img className="ava" src="ava2.png" alt="avatar" />
                    <img className="ava" src="ava3.png" alt="avatar" />
                    <img className="ava" src="ava4.png" alt="avatar" />
                    <img className="ava" src="ava5.png" alt="avatar" />
                </div>
            </div>
        </div>
    )

};