import { Questions } from "./Questions"

export function Registration(){

    return(
        <div className="reg">
            <div className="avatar" >
                <img src="C:\Users\никита\Desktop\pro\react-start\src\avatar.png" alt="аватарка"/>
            </div>
            <div className="namequiz">
                <p className="textquiz">название</p>
            </div>
            <div className="person">
                <p className="quest">Как вас зовут?</p>
                <input className="login" type="text" placeholder="имя пользователя"></input><br />
                <button className="button" onClick={()=>"index1.js"} >Начать!</button>
            </div>
        </div>

    )
};


function Quest(){
    return(
    <Questions/>
)
    
};



