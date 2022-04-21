const API = "https://mock-api.driven.com.br/api/v6/buzzquizz";
let quizzes = [];

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
    //console.log(response.data);
    document.querySelector(".container").classList.add("hidden");
    renderClickedQuizz(response);
}

function renderClickedQuizz(element) {
    let quizz = element.data;
    // console.log(quizz.questions);
    // quizz = randomizeAnswers(quizz);
    // console.log(quizz.questions);
    document.querySelector(".second_screen").innerHTML =
    `
    <div class="banner">
    <img src="${quizz.image}" alt="banner_test">
    <div class="img_bgd"></div>
    <p class="title">${quizz.title}</p>
</div>
<div class="questions">
    <div class="question">
        <div class="title">
            Em qual animal Olho-Tonto Moody transfigurou Malfoy?
        </div>
        <div class="answers">
            <div class="answer">
                <img src="img/image1.png" alt="gatinho">
                <div class="text">
                    Gatíneo
                </div>
            </div>
            <div class="answer">
                <img src="img/image2.png" alt="ratinho">
                <div class="text">
                    Ratata
                </div>
            </div>
            <div class="answer">
                <img src="img/image3.png" alt="sapo">
                <div class="text">
                    Sapo gordo
                </div>
            </div>
            <div class="answer">
                <img src="img/image4.png" alt="furao">
                <div class="text">
                    Mustela putorius
                </div>
            </div>
        </div>

    </div>
    <div class="question">
        <div class="title">
            Em qual animal Olho-Tonto Moody transfigurou Malfoy?
        </div>
        <div class="answers">
            <div class="answer">
                <img src="img/image1.png" alt="gatinho">
                <div class="text">
                    Gatíneo
                </div>
            </div>
            <div class="answer">
                <img src="img/image2.png" alt="ratinho">
                <div class="text">
                    Gatíneo
                </div>
            </div>
            <div class="answer">
                <img src="img/image3.png" alt="sapo">
                <div class="text">
                    Gatíneo
                </div>
            </div>
            <div class="answer">
                <img src="img/image4.png" alt="furao">
                <div class="text">
                    Gatíneo
                </div>
            </div>
        </div>

    </div>
</div>
<div class="level">
    <div class="title">
        88% de acerto: Você é praticamente um aluno de Hogwarts!
    </div>
    <div class="content">
        <img src="img/image5.png" alt="Resultado">
        <div class="text">
            Parabéns Potterhead! Bem-vindx a Hogwarts, aproveite o loop infinito de comida e clique no botão abaixo para usar o vira-tempo e reiniciar este teste. 
        </div>
    </div>
    
</div>
<div class="buttons">
    <div class="restart">Reiniciar Quizz</div>
    <div class="home">Voltar pra home</div>
</div>
    `
    document.querySelector(".second_screen").classList.remove("hidden");
    //console.log(quizz);
}

// function comparison() {
//     return Math.random() - 0.5;
// }

// function randomizeAnswers(quizz) {
//     let aux = quizz;
//     for(let i = 0; i < aux.questions.length; i++) {
//         aux.questions[i].answers.sort(comparison);
//     }
//     return aux;
// }

getQuizzes();


// //arr.sort(randomNumber)
// let THIS_QUIZZ = {}; //array com o quizz escolhido/atual

// loadQuizz();

// function randomNumber() { 
// 	return Math.random() - 0.5; 
// }

// function loadQuizz(){
//     const promise = axios.get(`${API}/quizzes/`);
//     //console.log(promise);
//     promise.then(renderQuizz);
// }

// function renderQuizz(response){
//     const quizz_page = document.querySelector("aside");
//     quizz_page.innerHTML="";
//     THIS_QUIZZ=response.data;
//     //console.log(THIS_QUIZZ);
//     quizz_page.innerHTML = secondScreen(response);
// }

// // secondScreen();
// // THIS_QUIZ.questions= [
// // 		{
// // 			title: "Título da pergunta 1",
// // 			color: "#123456",
// // 			answers: [
// // 				{
// // 					text: "Texto da resposta 1",
// // 					image: "https://http.cat/411.jpg",
// // 					isCorrectAnswer: true
// // 				},
// // 				{
// // 					text: "Texto da resposta 2",
// // 					image: "https://http.cat/412.jpg",
// // 					isCorrectAnswer: false
// // 				}
// // 			]
// // 		},
// // 		{
// // 			title: "Título da pergunta 2",
// // 			color: "#123456",
// // 			answers: [
// // 				{
// // 					text: "Texto da resposta 1",
// // 					image: "https://http.cat/411.jpg",
// // 					isCorrectAnswer: true
// // 				},
// // 				{
// // 					text: "Texto da resposta 2",
// // 					image: "https://http.cat/412.jpg",
// // 					isCorrectAnswer: false
// // 				}
// // 			]
// // 		},
// // 		{
// // 			title: "Título da pergunta 3",
// // 			color: "#123456",
// // 			answers: [
// // 				{
// // 					text: "Texto da resposta 1",
// // 					image: "https://http.cat/411.jpg",
// // 					isCorrectAnswer: true
// // 				},
// // 				{
// // 					text: "Texto da resposta 2",
// // 					image: "https://http.cat/412.jpg",
// // 					isCorrectAnswer: false
// // 				}
// // 			]
// // 		}
// // 	];


// function secondScreen(){
//     console.log(THIS_QUIZZ);
//     const this_quizzes = THIS_QUIZZ.questions.map(mapFunction);

//     function mapFunction(question){
//         return Question(question);
//     }

//     console.log("this_quizzes");
//     console.log(this_quizzes);

//     return `
//         <div class="banner">
//             <img src="${THIS_QUIZZ.image}" alt="${THIS_QUIZZ.title}">
//             <div class="img_bgd"></div>
//             <p class="title">${THIS_QUIZZ.title}</p>
//         </div>
//         <div class="questions">
//         ${this_quizzes.join("")}
//         </div>
//     `
// }

// function Question(question){
//     question.answers.sort(randomNumber);
//     const answers = question.answers.map(mapFunction);

//     function mapFunction(answer){
//         return Answer(answer);
//     }

//     return `
//                 <div class="question" data-id="question">
//                     <div class="title">
//                         ${question.title}
//                     </div>
//                     <div class="answers">
//                         ${answers.join("")}
//                     </div>
    
//                 </div>
//     `;
// }

// function Answer(answer){
//     // console.log("answer");
//     // console.log(answer);
//     let type_answer = "";

//     if (answer.isCorrectAnswer){
//         type_answer="correctTrue";
//     }else{
//         type_answer="correctFalse";
//     }

//     return `
//     <div class="answer ${type_answer}" data-id="answer" onclick="Answered(this,${answer.isCorrectAnswer})">
//         <img src="${answer.image}">
//         <div class="text">${answer.text}</div>
//     </div>
//     `;
// }


// function Answered(element,isCorrectAnswer){
//     const answers_arr = element.parentNode;
//     answers_arr.classList.add("answered");
//     console.log("answers_arr");
//     console.log(answers_arr);
//     opacityWrongAnswers(answers_arr,element);
//     console.log(isCorrectAnswer);
// }

// function opacityWrongAnswers(answers_arr,element){
//     const answers = answers_arr.querySelectorAll(".answer");
//     console.log(answers);
    
//     for (let i=0; i<answers.length ; i++){
//         const answer = answers[i];
//         if (answer !== element ){
//             answer.classList.add("whitish");
//         }
//     }
// }


