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
        <div class="nivel">
            <div class="title">
                88% de acerto: Você é praticamente um aluno de Hogwarts!
            </div>
            <img src="img/image5.png" alt="Resultado">
        </div>
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