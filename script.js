const API = "https://mock-api.driven.com.br/api/v6/buzzquizz";
let quizzes = [];
let currentQuizz ={};
let qttQuestions=0;
let qttAnswered=0;
let qttCorrect=0;
let score=0;

let min_value=[];


let userQuizz = {
    title: "",
    image: "",
    questions: "",
    levels: ""
};
let numberOfQuestions;
let numberOfLevels=0;
let levels_arr=[];


function reloadPage() {
    window.location.reload();
}

function createNewQuizz() {
    document.querySelector(".container").classList.add("hidden");
    document.querySelector(".QuizzMakingChildren.Info").classList.remove("hidden");
}

function setQuizzBasicInfo() {
    userQuizz.title = document.querySelector(".QuizzMakingChildren.Info .userQuizzTitle").value;
    userQuizz.image = document.querySelector(".QuizzMakingChildren.Info .userQuizzImage").value;
    numberOfQuestions = Number(document.querySelector(".QuizzMakingChildren.Info .userQuizzNumberOfQuestions").value);
    numberOfLevels = Number(document.querySelector(".QuizzMakingChildren.Info .userQuizzNumberOfLevels").value);
    if(verifyQuizzBasicInfo(userQuizz.title, userQuizz.image, numberOfQuestions, numberOfLevels)) {
        document.querySelector(".QuizzMakingChildren.Info").classList.add("hidden");
        document.querySelector(".QuizzMakingChildren.Questions").classList.remove("hidden");
        renderQuizzQuestionsLayout();
    }
    else {
        alert("Por favor, preencha os dados corretamente!");
    }
}

function renderQuizzQuestionsLayout() {
    let button = `<div onclick="setQuizzAnswers()"class="button">Prosseguir pra criar níveis</div>`
    //starting from the second question, since the first one is hard coded in the html file.
    for(let i = 2; i < numberOfQuestions+1; i++) {
        document.querySelector(".QuizzMakingChildren.Questions").innerHTML +=
        `
        <div class="question question-${i}">
            <h2>Pergunta <span class="question-number">${i}</span></h2>
            <ion-icon onclick="expandQuestion(this)" name="create-outline"></ion-icon>
        </div>

        <div class="QuizzInfo question-${i} questionMargin" style="display:none">
            <h2>Pergunta ${i}</h2>
            <input class="userQuizzQuestionText" type="text" placeholder="Texto da pergunta" id="">
            <input class="userQuizzQuestionColour" type="text" placeholder="Cor de fundo da pergunta" id="">

            <h2>Resposta correta</h2>
            <div class="rightAnswer">
                <input class="userQuizzRightAnswerText" type="text" placeholder="Resposta correta" id="">
                <input class="userQuizzRightAnswerURL" type="text" placeholder="URL da imagem" id="">

            </div>

            <h2>Respostas incorretas</h2>
            <div class="wrongAnswers">
                <input type="text" placeholder="Resposta incorreta 1" id="">
                <input type="text" placeholder="URL da imagem 1" id="">

                <input type="text" placeholder="Resposta incorreta 2" id="">
                <input type="text" placeholder="URL da imagem 2" id="">

                <input type="text" placeholder="Resposta incorreta 3" id="">
                <input type="text" placeholder="URL da imagem 3" id="">

                <input type="text" placeholder="Resposta incorreta 4" id="">
                <input type="text" placeholder="URL da imagem 4" id="">
            </div>
        </div>
        `
    }
    document.querySelector(".QuizzMakingChildren.Questions").innerHTML += button;
}

function expandQuestion(element) {
    element.parentNode.setAttribute("style", "display:none");
    let questionNumber = Number(element.parentNode.querySelector("span").innerHTML);
    document.querySelector(`.QuizzInfo.question-${questionNumber}`).removeAttribute("style");

}

function setQuizzAnswers() {
    document.querySelector(".QuizzMakingChildren.Questions").classList.add("hidden");
    document.querySelector(".QuizzMakingChildren.Level").classList.remove("hidden");
    renderQuizzLevels();
}

//-------------------------------------------------------------------------------------
function renderQuizzLevels(){
    levels_arr= Array(numberOfLevels).fill("");
    document.querySelector(".QuizzMakingChildren.Level").innerHTML = createLevels(userQuizz.levels); 
}


function createLevels(levels) {
    document.querySelector(".QuizzMakingChildren.Questions").classList.add("hidden");
    document.querySelector(".QuizzMakingChildren.Level").classList.remove("hidden");
    const levelsQuizz = levels_arr.map((item,index)=>LevelsQuizz(index,levels[index]));
    return `
        <h3>Agora, decida os níveis</h3>
        ${levelsQuizz.join("")}
        <div onclick="quizzFinished()" class="button">Finalizar Quizz</div>
    `;

}

function LevelsQuizz(index,levelValue){
    let levelInfo ={};
    let openForm="";

    if (index===0){
        openForm="display";
    }else{
        openForm="hidden";
    }

    if(levelValue){
        levelInfo={
            title:levelValue.title,
            image:levelValue.image,
            minValue:levelValue.minValue,
            text:levelValue.text
        }
    }else{
        levelInfo={
            title:"",
            image:"",
            minValue:"",
            text:""
        }
    }
    return `
    <div class="QuizzInfo level${index+1}">
        <div class="title">
            <h2>Nível ${index+1}</h2>
            <div>
                <ion-icon class="icon" name="create-outline"></ion-icon>
            </div>   
        </div>
        <div>
            <input class="userQuizzQuestionText" type="text" placeholder="Título do nível" id="">
            <input class="userQuizzQuestionColour" type="text" placeholder="% de acerto mínima" id="">
            <input class="userQuizzQuestionColour" type="text" placeholder="URL da imagem do nível" id="">
            <input class="userQuizzQuestionColour" type="text" placeholder="Descrição do nível" id="">
        </div>
    </div>  
    `;

    // return `
    //     <div class="QuizzInfo level${index+1} ${openForm}">

        
    //         <h2>Nível ${index+1}</h2>
    //         <input class="userQuizzQuestionText" type="text" placeholder="Título do nível" id="">
    //         <input class="userQuizzQuestionColour" type="text" placeholder="% de acerto mínima" id="">
    //         <input class="userQuizzQuestionColour" type="text" placeholder="URL da imagem do nível" id="">
    //         <input class="userQuizzQuestionColour" type="text" placeholder="Descrição do nível" id="">
    
    //     </div>        
    // `;
}

function openOption(element,parentelement){

}


//---------------------------------------------------------------------------------------
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
    qttQuestions=questions.length;
    document.querySelector(".second_screen").scrollIntoView();
    
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
        <div class="level hidden" data-id="level">
            
        </div>
        <div class="buttons hidden">
            <div class="restart" onclick="reStart()">Reiniciar Quizz</div>
            <div class="home" onclick="reloadPage()">Voltar pra home</div>
        </div>    
    `
    ;
    
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
    qttAnswered = qttAnswered +1;

    opacityWrongAnswers(answers_arr,element);

    if (isCorrectAnswer){
        qttCorrect = qttCorrect +1;
    }

    scrollIntoNextQuestion(index);
    isFinished();
    
    
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

function isFinished(){
    if (qttAnswered===qttQuestions){
        setTimeout(function() {
            const level = document.querySelector(".level.hidden");
            level.classList.remove("hidden");
            const buttons = document.querySelector(".buttons.hidden");
            buttons.classList.remove("hidden");
            level.scrollIntoView();
        }, 2000);
        LevelScore();
    }
    

}

function LevelScore (){
    score = Math.floor((qttCorrect/qttQuestions)*100);
    currentQuizz.levels.map((level) => min_value.push(level.minValue));
    
    for (let i=0; i<min_value.length; i++){
        const index = (min_value.length)-1-i;
        const value= min_value[index];

        if (score >= Number(value)){
            document.querySelector(".level").innerHTML = `
            <div class="title">
                ${score}% de acerto: ${currentQuizz.levels[index].title}
            </div>
            <div class="content">
                <img src="${currentQuizz.levels[index].image}" alt="${currentQuizz.title}">
                <div class="text">${currentQuizz.levels[index].text}</div>
            </div>`;
            break;
        }
    }

}



function reStart(){
    qttAnswered=0;
    qttCorrect=0;
    min_value=[];
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


//INPUT VALIDATION

function verifyQuizzBasicInfo(title, imageURL, questions, levels) {
    if((title.length >= 20 && title.length <=65) && questions >= 3 && levels >= 2 && isValidWebUrl(imageURL)) {
        return true;
    }
    return false;
}

function isValidWebUrl(url) {
    let regEx = /^https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)$/gm;
    return regEx.test(url);
}

//INPUT VALIDATION