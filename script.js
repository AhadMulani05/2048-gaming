document.addEventListener("DOMContentLoaded", () => {
    const boardSize = 4;
    let board = Array.from({ length: boardSize }, () => Array(boardSize).fill(0));

    function generateTile() {
        let emptyCells = [];
        for (let r = 0; r < boardSize; r++) {
            for (let c = 0; c < boardSize; c++) {
                if (board[r][c] === 0) {
                    emptyCells.push({ r, c });
                }
            }
        }
        if (emptyCells.length > 0) {
            let { r, c } = emptyCells[Math.floor(Math.random() * emptyCells.length)];
            board[r][c] = Math.random() < 0.9 ? 2 : 4;
        }
    }

    function drawBoard() {
        const boardElement = document.getElementById("board");
        boardElement.innerHTML = "";
        for (let r = 0; r < boardSize; r++) {
            for (let c = 0; c < boardSize; c++) {
                let tile = document.createElement("div");
                tile.classList.add("tile");
                if (board[r][c] !== 0) {
                    tile.textContent = board[r][c];
                    tile.style.backgroundColor = getTileColor(board[r][c]);
                }
                boardElement.appendChild(tile);
            }
        }
    }

    function getTileColor(value) {
        const colors = {
            2: "#eee4da",
            4: "#ede0c8",
            8: "#f2b179",
            16: "#f59563",
            32: "#f67c5f",
            64: "#f65e3b",
            128: "#edcf72",
            256: "#edcc61",
            512: "#edc850",
            1024: "#edc53f",
            2048: "#edc22e"
        };
        return colors[value] || "#3c3a32";
    }

    function slide(row) {
        let filtered = row.filter(val => val);
        let missing = boardSize - filtered.length;
        let zeros = Array(missing).fill(0);
        return filtered.concat(zeros);
    }

    function combine(row) {
        for (let i = 0; i < boardSize - 1; i++) {
            if (row[i] !== 0 && row[i] === row[i + 1]) {
                row[i] *= 2;
                row[i + 1] = 0;
            }
        }
        return row;
    }

    function moveLeft() {
        for (let r = 0; r < boardSize; r++) {
            board[r] = slide(board[r]);
            board[r] = combine(board[r]);
            board[r] = slide(board[r]);
        }
        generateTile();
        drawBoard();
    }

    function moveRight() {
        for (let r = 0; r < boardSize; r++) {
            board[r].reverse();
            board[r] = slide(board[r]);
            board[r] = combine(board[r]);
            board[r] = slide(board[r]);
            board[r].reverse();
        }
        generateTile();
        drawBoard();
    }

    function moveUp() {
        for (let c = 0; c < boardSize; c++) {
            let column = board.map(row => row[c]);
            column = slide(column);
            column = combine(column);
            column = slide(column);
            for (let r = 0; r < boardSize; r++) {
                board[r][c] = column[r];
            }
        }
        generateTile();
        drawBoard();
    }

    function moveDown() {
        for (let c = 0; c < boardSize; c++) {
            let column = board.map(row => row[c]).reverse();
            column = slide(column);
            column = combine(column);
            column = slide(column);
            column.reverse();
            for (let r = 0; r < boardSize; r++) {
                board[r][c] = column[r];
            }
        }
        generateTile();
        drawBoard();
    }

    function handleKeyPress(event) {
        switch (event.key) {
            case "ArrowLeft":
                moveLeft();
                break;
            case "ArrowRight":
                moveRight();
                break;
            case "ArrowUp":
                moveUp();
                break;
            case "ArrowDown":
                moveDown();
                break;
        }
    }

    document.addEventListener("keydown", handleKeyPress);
    generateTile();
    generateTile();
    drawBoard();
});
