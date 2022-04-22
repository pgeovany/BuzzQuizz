const API = "https://mock-api.driven.com.br/api/v6/buzzquizz";
let quizzes = [];
let currentQuizz ={};

function reloadPage() {
    window.location.reload();
}

function createNewQuizz() {
    document.querySelector(".container").classList.add("hidden");
    document.querySelector(".QuizzMakingChildren.Info").classList.remove("hidden");
}

function createQuestions() {
    document.querySelector(".QuizzMakingChildren.Info").classList.add("hidden");
    document.querySelector(".QuizzMakingChildren.Questions").classList.remove("hidden");
}

function createLevels() {
    document.querySelector(".QuizzMakingChildren.Questions").classList.add("hidden");
    document.querySelector(".QuizzMakingChildren.Level").classList.remove("hidden");
}

function quizzFinished() {
    document.querySelector(".QuizzMakingChildren.Level").classList.add("hidden");
    document.querySelector(".QuizzMakingChildren.Success").classList.remove("hidden");
}

function getQuizzes() {
    let promise = axios.get(`${API}/quizzes`);
    promise.then(renderQuizzes);
}

function renderQuizzes(response) {
    quizzes = response.data;
    let board = document.querySelector(".AllQuizzes .Quizzes");
    board.innerHTML = "";
    for(let i = 0; i < quizzes.length; i++) {
    board.innerHTML +=`
    <div onclick="getClickedQuizz(this)" class="Quizz">
        <img src="${quizzes[i].image}" alt="quizz image">
        <div class="img_bgd"></div>
        <div>
            <h1>${quizzes[i].title}</h1>
            <span class="id hidden">${quizzes[i].id}</span>
        </div>
    </div>
    `;
    }
}

function getClickedQuizz(element) {
    let promise = axios.get(`${API}/quizzes/${element.querySelector(".id").innerHTML}`);
    promise.then(playQuizz);
}

function playQuizz(response) {
    document.querySelector(".container").classList.add("hidden");
    document.querySelector(".second_screen").classList.remove("hidden");
    renderClickedQuizz(response);
    
}

getQuizzes();

function randomNumber() { 
	return Math.random() - 0.5; 
}

function renderClickedQuizz (response) {
    currentQuizz = response.data;
    const questions = currentQuizz.questions.map((question,index) => Question(question,index));
    return document.querySelector(".second_screen").innerHTML =
    `
        <div class="banner">
            <img src="${currentQuizz.image}" alt="${currentQuizz.title}">
            <div class="img_bgd"></div>
            <p class="title">${currentQuizz .title}</p>
        </div>
        <div class="questions">
        ${questions.join("")}
        </div>
        <div class="level" data-id="level">
            <div class="title">
                ${currentQuizz.levels[0].minValue}% de acerto: ${currentQuizz.levels[0].title}
            </div>
            <div class="content">
                <img src="${currentQuizz.levels[0].image}" alt="${currentQuizz.title}">
                <div class="text">${currentQuizz.levels[0].text}</div>
            </div>
        </div>
        <div class="buttons">
            <div class="restart" onclick="reStart()">Reiniciar Quizz</div>
            <div class="home" onclick="reloadPage()">Voltar pra home</div>
        </div>    
    `;
    
}

function Question(question,index){
    question.answers.sort(randomNumber);
    const answers = question.answers.map((answer) => Answer(answer,index));

    return `
                <div class="question question_${index}" data-id="question">
                    <div class="title">
                        ${question.title}
                    </div>
                    <div class="answers">
                        ${answers.join("")}
                    </div>
                </div>
    `;
}

function Answer(answer,index){
    let type_answer = "";

    if (answer.isCorrectAnswer){
        type_answer="correctTrue";
    }else{
        type_answer="correctFalse";
    }

    return `
    <div class="answer ${type_answer}" data-id="answer" onclick="Answered(this,${answer.isCorrectAnswer},${index})">
        <img src="${answer.image}">
        <div class="text">${answer.text}</div>
    </div>
    `;
}


function Answered(element,isCorrectAnswer,index){
    const answers_arr = element.parentNode;
    answers_arr.classList.add("answered");

    opacityWrongAnswers(answers_arr,element);
    console.log(isCorrectAnswer);

    scrollIntoNextQuestion(index);
}

function opacityWrongAnswers(answers_arr,element){
    const answers = answers_arr.querySelectorAll(".answer");
    element.removeAttribute("onclick");
    
    for (let i=0; i < answers.length ; i++){
        const answer = answers[i];
        if (answer !== element ){
            answer.classList.add("whitish");
            answer.removeAttribute("onclick");
        }
    }
}


function reStart(){
    const top_screen = document.querySelector(".banner");
    top_screen.scrollIntoView();
    reLoadQuizz();
}

function reLoadQuizz(){
    const promise = axios.get(`${API}/quizzes/${currentQuizz.id}`);
    const quizz_page = document.querySelector(".second_screen");
    quizz_page.classList.remove("hidden");

    promise.then(response => {
        quizz_page.innerHTML="";
        quizz_page.innerHTML = renderClickedQuizz(response);
    }) 
}

function scrollIntoNextQuestion(index){
    const index_questionAnswered = index;
    const index_lastQuestion = currentQuizz.questions.length-1;
    const index_nextQuestion = index +1;
    
    if (index_questionAnswered !== index_lastQuestion){
        const nextQuestion =  document.querySelector(`.question_${index_nextQuestion}`);
        setTimeout(function() {
            return nextQuestion.scrollIntoView();
           }, 2000);
    }
}
