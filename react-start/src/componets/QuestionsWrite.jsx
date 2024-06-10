export function QuestionsWrite(){
    return(
        <div className="fieldWrite">
            <div className="elements">
                <p className="question">Кто проживает на дне океана?</p>
                <div className="questPhoto">
                    <img className="photo" src="gubka.jpg" alt="Gubka" />
                </div>
                <div className="timer">
                    <p className="seconds">60c</p>
                </div>
                <div className="answers">
                    <input className="inputText" type="text" placeholder="ваш ответ" />
                </div>
                <div className="button1">
                    <button className="toAnswer">ответить</button>
                </div>
            </div>
        </div>
    )

};