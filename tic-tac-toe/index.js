let cells = ['', '', '', '', '', '', '', '', ''];
let currentPlayer = 'X';
let result = document.querySelector('.result');
let btns = document.querySelectorAll('.btn');
let conditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

//element represent a button is clicke
//index represents the position of the button that has been clicked

const ticTacToe = (element, index) => { 
    element.value = currentPlayer;
    element.disabled = true;
    element.classList.add(currentPlayer === 'X' ? 'x-symbol' : 'o-symbol');
    // Add class name based on the current player's symbol

    cells[index] = currentPlayer;
    currentPlayer = currentPlayer == 'X' ? 'O' : 'X';
    result.innerHTML = `Player ${currentPlayer} Turn`;

    let isTie = true; // assume it's a tie until we find an empty cell
    for (let i = 0; i < cells.length; i++) {
        if (cells[i] == '') {
            isTie = false; // found an empty cell, so it's not a tie
            break;
        }
    }

    if (isTie) {
        result.innerHTML = "It's a tie! 😐";
        btns.forEach((btn) => btn.disabled = true);
    } else {
        for (let i = 0; i < conditions.length; i++) {
            let condition = conditions[i];
            let a = cells[condition[0]];
            let b = cells[condition[1]];
            let c = cells[condition[2]];

            if (a == '' || b == '' || c == '') {
                continue;
            }

            if ((a == b) && (b == c)) {
                result.innerHTML = `Player ${a} Won 🎉`;
                btns.forEach((btn) => btn.disabled = true);
            }
        }
    }
};





function reset() {
    cells = ['', '', '', '', '', '', '', '', ''];
    btns.forEach((btn) => {
        btn.value = '';
    });
    currentPlayer = 'X';
    result.innerHTML = `Player X Turn`;
    btns.forEach((btn) => btn.disabled = false);
};

document.querySelector('#reset').addEventListener('click', reset);

btns.forEach((btn, i) => {
    btn.addEventListener('click', () => ticTacToe(btn, i));
});