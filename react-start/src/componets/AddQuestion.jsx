export function AddQuestion(){
    return(
        <div className="fieldAdd">
            <div className="elementsAdd">
                <p className="AddQuest">Создание вопросов</p>
                <div className="inputField">
                    <div className="textField">
                        <input className="TextField" type="text" value={"введите текст вопроса"}/>
                    </div>
                    <div className="picField">
                        <input className="pic" type="pic" value={"картинка (необезательно)"} />
                    </div>
                    <div className="addAns">
                        <input className="TextField" type="text" value={"добавить вариант ответа"} />
                    </div>
                    <p className="dopAns">+ 1 вариант ответа</p>
                    <div className="addButton">
                        <button className="viewing">предварительный просмотр</button>
                    </div>
                    <div className="check">
                        <input type="checkbox" className="custom-checkbox" id="last" />
                        <label className="lab" for="last">это последний вопрос?</label>
                    </div>
                </div>
            </div>
        </div>

    )

};