const API = "https://mock-api.driven.com.br/api/v4/buzzquizz";
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
    <div onclick="playQuizz(this)" class="Quizz">
        <img src="${quizzes[i].image}" alt="quizz image">
        <div class="img_bgd"></div>
        <div>
            <h1>${quizzes[i].title}</h1>
        </div>
    </div>
    `;
    }
}

function playQuizz(array) {
    console.log(array);
}
getQuizzes();
//renderQuizz();