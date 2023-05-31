"use strict";
/*-------------------------------- Constants --------------------------------*/
const choice = ["O", "X"];
/*---------------------------- Variables (state) ----------------------------*/
let board, turn, winner, tie;
let display;
/*------------------------ Cached Element References ------------------------*/
const messageEl = document.querySelector("#message");
const resetBtnEl = document.querySelector(".reset");
const squareEls = document.querySelectorAll(".sqr");
/*----------------------------- Event Listeners -----------------------------*/
squareEls.forEach((sqr) => {
    sqr.addEventListener("click", play);
});
resetBtnEl.addEventListener("click", init);
/*-------------------------------- Functions --------------------------------*/
init();
function init() {
    let allSqr = document.querySelectorAll(".sqr p");
    allSqr.forEach((e) => e.remove());
    board = [0, 0, 0, 0, 0, 0, 0, 0, 0];
    turn = 1;
    winner = false;
    tie = false;
    messageEl.innerHTML =
        "Welcome to Tic-Tac-Toe Game <br /> Player1 (O) click any square to start";
}
function updateMessage() {
    winner == false && tie == false
        ? (messageEl.innerHTML = `Now is ${turn == 1 ? "Player2's (X)" : "Player1's (O)"} turn <br /> please select a square`)
        : winner == false && tie == true
            ? (messageEl.innerHTML = `Tie, Both you do a good job! 
        <br /> The Game Will Reset in 3 seconds`)
            : (messageEl.innerHTML = `${turn == 1 ? "Player1's (O)" : "Player2's (X)"} Win <br /> The Game Will Reset in 3 seconds`);
}
function play(evt) {
    if (!evt.target || !('id' in evt.target))
        return;
    const target = evt.target;
    console.log("target:", target);
    if (winner)
        return;
    let O = document.createElement("p");
    O.innerText = choice[0];
    O.setAttribute("class", "OO");
    let X = document.createElement("p");
    X.innerText = choice[1];
    X.setAttribute("class", "XX");
    let sqId = target.id;
    console.log("sqId:", sqId, sqId[2], typeof sqId);
    turn == 1
        ? (target.append(O), (display = "O"))
        : (target.append(X), (display = "X"));
    //---------------------one square cannot be clicked twice------------------
    //document.querySelector(`#${sqId}`).removeEventListener("click", play)
    let allSqr = document.querySelectorAll(`#${sqId} p`);
    if (allSqr[1] !== undefined) {
        console.log(allSqr[1]);
        allSqr[1].remove();
        // console.log(board);
        alert("one square cannot be selected twice, please select again");
        return;
    }
    board[Number(sqId[2])] = display == "O" ? 1 : -1;
    //   console.log(board);
    checkForWin();
    updateMessage();
    if (winner === true || tie === true) {
        setTimeout(() => {
            init();
        }, 3000);
        return;
    }
    else {
        turn *= -1;
    }
}
function checkForWin() {
    if ((board[0] == board[1] && board[0] == board[2] && board[0] != 0) ||
        (board[3] == board[4] && board[3] == board[5] && board[3] != 0) ||
        (board[6] == board[7] && board[6] == board[8] && board[6] != 0) ||
        (board[0] == board[3] && board[0] == board[6] && board[0] != 0) ||
        (board[1] == board[4] && board[1] == board[7] && board[1] != 0) ||
        (board[2] == board[5] && board[2] == board[8] && board[2] != 0) ||
        (board[0] == board[4] && board[0] == board[8] && board[0] != 0) ||
        (board[2] == board[4] && board[2] == board[6] && board[2] != 0)) {
        winner = true;
        return;
    }
    //--------------check for tie-------------
    for (let i = 0; i < board.length; i++) {
        if (board[i] == 0) {
            return;
        }
    }
    tie = true;
}
