let userScore = 0;
let computerScore = 0;
let winCount = 5;

let isGameOver = false;

const userScore_span = document.getElementById("user-score");
const computerScore_span = document.getElementById("computer-score");
const scoreBoard_div = document.querySelector(".score-board");
const result_p = document.querySelector(".result p");

const rock_div = document.getElementById("r");
const paper_div = document.getElementById("p");
const scissors_div = document.getElementById("s");

function getComputerChoice() {
    let choices = ["r", "p", "s"];
    let randomNumber = Math.floor(Math.random() * 3);
    return choices[randomNumber];
}

function convertToWord(letter) {
    if (letter === "r") return "Rock";
    if (letter === "p") return "Paper";
    return "Scissors";
}

function win(userChoice, computerChoice) {
    userScore++;
    userScore_span.innerHTML = userScore;
    computerScore_span.innerHTML = computerScore;
    result_p.innerHTML = `${convertToWord(userChoice)} (User) beats ${convertToWord(computerChoice)} (Comp), you win!`;
    document.getElementById(userChoice).classList.add("green-glow");
    result_p.classList.remove("red-text");
    result_p.classList.remove("blue-text");
    result_p.classList.add("green-text");
    setTimeout(function () {
        if (!isGameOver) {
            document.getElementById(userChoice).classList.remove("green-glow")
        }
    }, 600);
}

function lose(userChoice, computerChoice) {
    computerScore++;
    userScore_span.innerHTML = userScore;
    computerScore_span.innerHTML = computerScore;
    result_p.innerHTML = `${convertToWord(computerChoice)} (Comp) beats ${convertToWord(userChoice)} (User), you lose!`;
    document.getElementById(userChoice).classList.add("red-glow");
    result_p.classList.remove("green-text");
    result_p.classList.remove("blue-text");
    result_p.classList.add("red-text");
    setTimeout(function () {
        if (!isGameOver) {
            document.getElementById(userChoice).classList.remove("red-glow")
        }
    }, 600);
}

function draw(userChoice, computerChoice) {
    result_p.innerHTML = `${convertToWord(userChoice)} (User) equals 
    ${convertToWord(computerChoice)} (Comp), it's a draw!`;
    document.getElementById(userChoice).classList.add("blue-glow");
    result_p.classList.remove("green-text");
    result_p.classList.remove("red-text");
    result_p.classList.add("blue-text");
    setTimeout(function () {
        if (!isGameOver) {
            document.getElementById(userChoice).classList.remove("blue-glow")
        }
    }, 600);
}

function isGameFinished(userScore, computerScore) {
    if (userScore == winCount || computerScore == winCount) {
        return true;
    }
    return false;
}

function showRestart() {
    document.getElementById("restart").classList.remove("hidden");
}

function showWinner(userScore, computerScore) {
    if (userScore > computerScore) {
        result_p.classList.remove("red-text");
        result_p.classList.remove("blue-text");
        result_p.classList.add("green-text");
        result_p.innerHTML = "Game Over! User wins! Play again.";
    } else {
        result_p.classList.remove("green-text");
        result_p.classList.remove("blue-text");
        result_p.classList.add("red-text");
        result_p.innerHTML = "Game Over! Computer wins! Play again.";
    }
}

function gameFinished() {
    isGameOver = true;
    document.getElementById("removable").remove();
    showWinner(userScore, computerScore);
    showRestart();
}

function game(userChoice) {
    const computerChoice = getComputerChoice();
    switch (userChoice + computerChoice) {
        case "rs":
        case "pr":
        case "sp":
            win(userChoice, computerChoice);
            break;
        case "rp":
        case "ps":
        case "sr":
            lose(userChoice, computerChoice);
            break;
        case "rr":
        case "pp":
        case "ss":
            draw(userChoice, computerChoice);
            break;
    }
    if (isGameFinished(userScore, computerScore)) {
        gameFinished()
    }
}

function main() {
    rock_div.addEventListener("click", function () {
        game("r");
    })

    paper_div.addEventListener("click", function () {
        game("p");
    })

    scissors_div.addEventListener("click", function () {
        game("s");
    })

}

main();
