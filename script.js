const API = "https://mock-api.driven.com.br/api/v6/buzzquizz";
let quizzes = [];

function reloadPage() {
    window.location.reload();
}

function createNewQuizz() {
    console.log("To do");
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
    renderClickedQuizz(response);
}

getQuizzes();

function randomNumber() { 
	return Math.random() - 0.5; 
}

function renderClickedQuizz (response) {
    const currentQuizz = response.data;
    const randomizedAnswers = currentQuizz.questions.map(question => Answers(question));
    document.querySelector(".second_screen").innerHTML =
    `
        <div class="banner">
            <img src="${currentQuizz.image}" alt="${currentQuizz.title}">
            <div class="img_bgd"></div>
            <p class="title">${currentQuizz .title}</p>
        </div>
        <div class="questions">
        ${randomizedAnswers.join("")}
        </div>
    `
    document.querySelector(".second_screen").classList.remove("hidden");
}

function Answers(question){
    question.answers.sort(randomNumber);
    const answers = question.answers.map(mapFunction);

    function mapFunction(answer){
        return Answer(answer);
    }

    return `
                <div class="question" data-id="question">
                    <div class="title">
                        ${question.title}
                    </div>
                    <div class="answers">
                        ${answers.join("")}
                    </div>
    
                </div>
    `;
}

function Answer(answer){
    let type_answer = "";

    if (answer.isCorrectAnswer){
        type_answer="correctTrue";
    }else{
        type_answer="correctFalse";
    }

    return `
    <div class="answer ${type_answer}" data-id="answer" onclick="Answered(this,${answer.isCorrectAnswer})">
        <img src="${answer.image}">
        <div class="text">${answer.text}</div>
    </div>
    `;
}


function Answered(element,isCorrectAnswer){
    const answers_arr = element.parentNode;
    answers_arr.classList.add("answered");
    console.log("answers_arr");
    console.log(answers_arr);
    opacityWrongAnswers(answers_arr,element);
    console.log(isCorrectAnswer);
}

function opacityWrongAnswers(answers_arr,element){
    const answers = answers_arr.querySelectorAll(".answer");
    console.log(answers);
    
    for (let i=0; i < answers.length ; i++){
        const answer = answers[i];
        if (answer !== element ){
            answer.classList.add("whitish");
        }
    }
}


