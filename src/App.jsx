import { useState } from 'react';
import Player from "./components/Player";
import GameBoard from "./components/GameBoard";
import Log from "./components/Log";

function App() {
  const [gameTurns, setGameTurns] = useState([]);
  const [activePlayer, setActivePlayer] = useState('X');
  const [winner, setWinner] = useState(null);

  function checkWinner(board) {
    for (let i = 0; i < 3; i++) {
      if (board[i][0] && board[i][0] === board[i][1] && board[i][1] === board[i][2]) {
        return board[i][0]; 
      }
      if (board[0][i] && board[0][i] === board[1][i] && board[1][i] === board[2][i]) {
        return board[0][i]; 
      }
    }
    
    if (board[0][0] && board[0][0] === board[1][1] && board[1][1] === board[2][2]) {
      return board[0][0]; 
    }
    if (board[0][2] && board[0][2] === board[1][1] && board[1][1] === board[2][0]) {
      return board[0][2]; 
    }
    
    return null; 
  }

  // Handle square selection
  function handleSelectedSquare(rowIndex, colIndex) {
    if (winner) return; // Don't allow moves if there's a winner

    // Get the next player based on the current state of gameTurns
    const nextPlayer = gameTurns.length % 2 === 0 ? 'X' : 'O';

    // Add the new turn to the game turns
    setGameTurns(prevTurns => {
      const updatedTurns = [
        { square: { row: rowIndex, col: colIndex }, player: nextPlayer },
        ...prevTurns
      ];

      // Create the updated game board
      const board = Array(3).fill(null).map(() => Array(3).fill(null));
      updatedTurns.forEach(turn => {
        const { row, col } = turn.square;
        board[row][col] = turn.player;
      });

      // Check if there's a winner after this turn
      const winner = checkWinner(board);
      if (winner) {
        setWinner(winner);
      }

      return updatedTurns;
    });

    // Switch the active player
    setActivePlayer(nextPlayer === 'X' ? 'O' : 'X');
  }

  // Restart the game
  function restartGame() {
    setGameTurns([]);  // Empty the gameTurns array to reset the game
    setWinner(null);   // Reset the winner
    setActivePlayer('X');  // Set the active player back to 'X'
  }

  return (
    <main>
      <div id="game-container">
        <ol id="players" className="highlight-player">
          <Player initialName="Viktoria" symbol="X" isActive={activePlayer === 'X'} />
          <Player initialName="Arthur" symbol="O" isActive={activePlayer === 'O'} />
        </ol>
        <GameBoard onSelectSquare={handleSelectedSquare} turns={gameTurns} />
        {winner && <div id="game-over">
           <h2>{winner} is the winner!</h2>
          <button onClick={restartGame} className="button">Restart Game</button>
        </div>}
      </div>
      <Log turns={gameTurns} />
    </main>
  );
}

export default App;
