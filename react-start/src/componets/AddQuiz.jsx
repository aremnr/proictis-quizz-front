export function AddQuiz(){
    return(
        <div class="container">
            <h1>Quiz</h1>
            <label for="quiz-name">Название</label>
            <input type="text" id="quiz-name" />
        
            <label for="quiz-description">Описание (необязательно)</label>
            <input type="text" id="quiz-description"  />
        
            <button>перейти к созданию квиза</button>
    </div>
    )
};