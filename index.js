let Sudoku = [[], [], [], [], [], [], [], [], []];
let easy = document.getElementById("Easy");
let medium = document.getElementById("Medium");
let hard = document.getElementById("Hard");
let random = document.getElementById("Random");
let SolveSudoku = document.getElementById("SolveSudoku");

window.onload = () => {
    CreateSudoku();
}

// creating div's on DOM 
function CreateSudoku() {
    for (let i = 0; i < 9; i++) {
        for (let j = 0; j < 9; j++) {
            let box = document.createElement("div");
            box.id = i.toString() + j.toString();
            box.classList.add("box");
            document.getElementById("Sudoku").appendChild(box);
        }
    }
}

// fetching unsolved sudoku from SUGOKU Api
let xhrRequest = new XMLHttpRequest();
xhrRequest.onload = function () {
    let response = JSON.parse(xhrRequest.response);
    FillSudoku(response.board);
}

// based on difficulty lev3els
easy.onclick = function () {
    xhrRequest.open('get', 'https://sugoku.herokuapp.com/board?difficulty=easy');
    xhrRequest.send();
}

medium.onclick = function () {
    xhrRequest.open('get', 'https://sugoku.herokuapp.com/board?difficulty=medium');
    xhrRequest.send();
}

hard.onclick = function () {
    xhrRequest.open('get', 'https://sugoku.herokuapp.com/board?difficulty=hard');
    xhrRequest.send();
}

random.onclick = function () {
    xhrRequest.open('get', 'https://sugoku.herokuapp.com/board?difficulty=random');
    xhrRequest.send();
}

// filling the board on DOM
function FillSudoku(board) {
    for (let i = 0; i < 9; i++) {
        for (let j = 0; j < 9; j++) {
            if (board[i][j] != 0) {
                document.getElementById(i.toString() + j.toString()).innerText = board[i][j];
                Sudoku[i][j] = board[i][j];
            } else {
                document.getElementById(i.toString() + j.toString()).innerText = '';
                Sudoku[i][j] = 0;
            }
        }
    }
}

// Sudoku Validation Logic
function isValid(Sudoku, i, j, num) {
    // checking for same row and column
    for (let k = 0; k < 9; k++) {
        if (Sudoku[i][k] == num || Sudoku[k][j] == num) {
            return false;
        }
    } 
    // checking for 3x3 matrix
    let si = i - i % 3;
    let sj = j - j % 3;
    for (let a = si; a < si + 3; a++) {
        for (let b = sj; b < sj + 3; b++) {
            if (Sudoku[a][b] == num) {
                return false;
            }
        }
    } return true;
}

// Sudoku Solving logic using recursion and backtracking
function SudokuSolver(Sudoku, i, j) {
    if (i == 9) {
        FillSudoku(Sudoku);
        return;
    } let ni, nj;
    if (j == 8) {
        ni = i + 1;
        nj = 0;
    } else {
        ni = i;
        nj = j + 1;
    } if (Sudoku[i][j] == 0) {
        for (let num = 1; num <= 9; num++) {
            if (isValid(Sudoku, i, j, num)) {
                Sudoku[i][j] = num;
                SudokuSolver(Sudoku, ni, nj);
                Sudoku[i][j] = 0;
            }
        }
    } else {
        SudokuSolver(Sudoku, ni, nj);
    }
}

SolveSudoku.onclick = function SolveSudoku() {
    SudokuSolver(Sudoku, 0, 0);
}

