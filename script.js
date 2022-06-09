const Player = (marker) => {
    this.marker = marker;
    
    return {marker};
};

const gameboard = (() => {
    const cells = document.querySelectorAll(".cell");
    const board = [["", "", ""], ["", "", ""], ["", "", ""]];
    
    const updateBoard = () => {
        let i = 0;
        for (let row = 0; row < 3; row++) {
            for (let col = 0; col < 3; col++) {
                board[row][col] = cells[i].textContent;
                i++;
            }
        }
    };

    return {cells, board, updateBoard};
})();

const player1 = Player("x");
const player2 = Player("o");
const resetBtn = document.querySelector(".reset-btn");
const gameResult = document.querySelector(".game-result");

for (let i = 0; i < gameboard.cells.length; i++) {
    let cell = gameboard.cells[i];
    cell.addEventListener("click", (e) => {
        gameController.startGame(e.target, i);
    });
}

const gameController = ((player1, player2, gameboard) => {
    let gameOver = false;
    let gameWinner = false;
    let currentPlayer = player1;

    const startGame = (cell, idx) => {
        if (cell.textContent !== "" || gameOver) return false;
        writeMove(currentPlayer.marker, idx);

        if (checkPlayerWon(currentPlayer.marker)) {
            gameWinner = currentPlayer;
            gameOver = true;
        } else if (!checkAvailableMove()) {
            gameOver = true;
        }

        if (gameOver) endGame();

        currentPlayer = choosePlayerTurn();
    };

    const endGame = () => {
        showElement(resetBtn);
        showElement(gameResult);

        if (gameWinner) {
            gameResult.textContent = `Player ${currentPlayer.marker} won!`;
        } else {
            gameResult.textContent = `Game was a tie!`;
        }
    };

    const showElement = (element) => {
        element.classList.remove("hidden");
    }

    const hideElement = (element) => {
        element.classList.add("hidden");
    }

    const writeMove = (marker, i) => {
        gameboard.cells[i].textContent = marker;
        gameboard.updateBoard();
    };

    const choosePlayerTurn = () => {
        return (currentPlayer.marker === player1.marker) ? player2 : player1; 
    };

    const checkPlayerWon = (marker) => {
        if (rowWin(marker) || colWin(marker) || diagonalWin(marker)) return true;
        else return false;
    };

    const checkAvailableMove = () => {
        for (row of gameboard.board) {
            for (cell of row) {
                if (cell === "") return true;
            }
        }
        return false;
    };

    const rowWin = (marker) => {
        for (row of gameboard.board) {
            if (row.every((cell) => cell === marker)) return true;
            else return false;
        }
    };

    const colWin = (marker) => {
        for (let col = 0; col < 3; col++) {
            let column = [];
            for (let row = 0; row < 3; row++) {
                column.push(gameboard.board[row][col]);
            }
            if (column.every((cell) => cell === marker)) return true;
        }
        return false;
    };

    const diagonalWin = (marker) => {
        const diagonals = [];
        diagonals.push([gameboard.board[0][0], gameboard.board[1][1],
            gameboard.board[2][2]]);
        diagonals.push([gameboard.board[2][0], gameboard.board[1][1],
        gameboard.board[0][2]]);
        
        for (diagonal of diagonals) {
            if (diagonal.every((cell) => cell === marker)) return true;
        }
        return false;
    }

    return {startGame};
})(player1, player2, gameboard);