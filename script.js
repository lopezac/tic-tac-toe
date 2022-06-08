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

const gameController = ((player1, player2, gameboard) => {
    let gameOver = false;
    let gameWinner = false;

    const getPlayerMove = (marker) => {
        for (let i = 0; i < gameboard.cells.length; i++) {
            let cell = gameboard.cells[i];
            if (cell.textContent !== "") continue;
            cell.addEventListener("click", () => writeMove(marker, i));
        }
    };

    const writeMove = (marker, i) => {
        gameboard.cells[i].textContent = marker;
        gameboard.updateBoard();
    };

    const startGame = () => {
        let currentPlayer = player1;

        while (!gameOver) {
            getPlayerMove(currentPlayer.marker);
            currentPlayer = choosePlayerTurn(currentPlayer.marker);
        }
    };

    const choosePlayerTurn = (currentPlayer) => {
        return (currentPlayer === player1.marker) ? player2 : player1; 
    }

    const rowWin = (marker) => {
        for (row of gameboard.board) {
            row.every((cell) => cell === marker);
        }
    };

    getPlayerMove(player1.marker);

    return {startGame};
})(player1, player2, gameboard);

// gameController.startGame();