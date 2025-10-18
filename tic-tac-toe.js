window.addEventListener("DOMContentLoaded", () => {
    const squares = document.querySelectorAll("#board div");
    const status = document.getElementById("status");
    const newGameBtn = document.querySelector(".btn");

    let currentPlayer = "X";
    let gameActive = true;
    let boardState = Array(9).fill("");

    // 🎯 Exercise 1: Assign the "square" class to all divs in the board
    squares.forEach(square => {
        square.classList.add("square");

        // 🎯 Exercise 2: Handle clicks for X and O placement
        square.addEventListener("click", () => {
            if (!gameActive || square.textContent !== "") return;

            const index = Array.from(squares).indexOf(square);
            square.textContent = currentPlayer;
            square.classList.add(currentPlayer);
            boardState[index] = currentPlayer;

            if (checkWinner()) {
                status.textContent = `Congratulations! ${currentPlayer} is the Winner!`;
                status.classList.add("you-won");
                gameActive = false;
                return;
            }

            // Switch turns
            currentPlayer = currentPlayer === "X" ? "O" : "X";
        });

        // 🎯 Exercise 3: Hover effect
        square.addEventListener("mouseover", () => {
            if (gameActive && square.textContent === "") {
                square.classList.add("hover");
            }
        });

        square.addEventListener("mouseout", () => {
            square.classList.remove("hover");
        });
    });

    // 🧩 Exercise 4: Check for a winner
    function checkWinner() {
        const winCombos = [
            [0,1,2], [3,4,5], [6,7,8], // rows
            [0,3,6], [1,4,7], [2,5,8], // columns
            [0,4,8], [2,4,6]           // diagonals
        ];

        return winCombos.some(combo => {
            const [a, b, c] = combo;
            if (boardState[a] && boardState[a] === boardState[b] && boardState[a] === boardState[c]) {
                return true;
            }
            return false;
        });
    }

    // 🔄 Exercise 5: Restart / New Game
    newGameBtn.addEventListener("click", () => {
        boardState.fill("");
        squares.forEach(square => {
            square.textContent = "";
            square.classList.remove("X", "O");
        });
        status.textContent = "Move your mouse over a square and click to play an X or an O.";
        status.classList.remove("you-won");
        currentPlayer = "X";
        gameActive = true;
    });
});
