export default function GameBoard({ onSelectSquare, turns }) {
    // Rebuild the game board based on turns
    let gameBoard = Array(3).fill(null).map(() => Array(3).fill(null));
  
    // Populate the board based on the game turns
    for (const turn of turns) {
      const { square, player } = turn;
      const { row, col } = square;
      gameBoard[row][col] = player;
    }
  
    return (
      <div>
        <ol id="game-board">
          {gameBoard.map((row, rowIndex) => (
            <li key={rowIndex}>
              <ol>
                {row.map((playerSymbol, colIndex) => (
                  <li key={colIndex}>
                    <button onClick={() => onSelectSquare(rowIndex, colIndex)}>{playerSymbol}</button>
                  </li>
                ))}
              </ol>
            </li>
          ))}
        </ol>
      </div>
    );
  }
  