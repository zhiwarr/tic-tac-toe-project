import PlayerInfo from './components/PlayerInfo';
import GameBoard from './components/GameBoard';
import Log from './components/Log';
import { WINNING_COMBINATIONS } from './winning-combination';
import { useState } from 'react';
import GameOver from './components/GameOver';
const INITIAL_BOARD = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
];
const INITIAL_PLAYERS = {
  X: "Player 1",
  O: "Player 2",
};
function derivePlayer(gameTurns) {
  let currentPlayer = "X";
  if (gameTurns.length > 0 && gameTurns[0].player === "X") {
    currentPlayer = "O";
  }
  return currentPlayer;
}
function deriveGameBoard(gameTurns) {
  let gameBoard = [...INITIAL_BOARD.map((innerArray) => [...innerArray])];
  for (const turn of gameTurns) {
    let { square, player } = turn;
    let { row, col } = square;
    gameBoard[row][col] = player;
  }
  return gameBoard;
}
function deriveWinner(gameBoard, players) {
  let winner;
  for (const combination of WINNING_COMBINATIONS) {
    const firstPlayerSymbol = gameBoard[combination[0].row][combination[0].column];
    const secondPlayerSymbol = gameBoard[combination[1].row][combination[1].column];
    const thirdPlayerSymbol = gameBoard[combination[2].row][combination[2].column];
    if (firstPlayerSymbol && firstPlayerSymbol === secondPlayerSymbol && firstPlayerSymbol === thirdPlayerSymbol) {
      winner = players[firstPlayerSymbol];
    }
  }
  return winner;
}
function App() {
  const [gameTurns, setGameTurns] = useState([]);
  const [players, setPlayers] = useState(INITIAL_PLAYERS);
  const activePlayer = derivePlayer(gameTurns);
  const currentBoard = deriveGameBoard(gameTurns);
  const winner = deriveWinner(currentBoard, players);
  const hasDraw = gameTurns.length === 9 && !winner;

  function handlePlayerName(symbol, newName) {
    setPlayers((prevPlayers) => ({
      ...prevPlayers,
      [symbol]: newName,
    }));
  }

  function handleGameTurns(rowIndex, colIndex) {
    setGameTurns((prevGameTurns) => {
      const currentPlayer = derivePlayer(prevGameTurns);
      const updatedGameTurns = [
        { square: { row: rowIndex, col: colIndex }, player: currentPlayer },
        ...prevGameTurns,
      ];
      console.log(updatedGameTurns);
      return updatedGameTurns;
    });
  }
  function resetGame() {
    setGameTurns([]);
  }
  return (
    <main>
      <div id="game-container">
        <ol id="players" className="highlight-player">
          <PlayerInfo name={players.X} onChangeName={handlePlayerName} symbol="X" isActive={activePlayer === 'X'} />
          <PlayerInfo name={players.O} onChangeName={handlePlayerName} symbol="O" isActive={activePlayer === 'O'} />
        </ol>
        <GameBoard onSelect={handleGameTurns} board={currentBoard} />
        {(winner || hasDraw) && <GameOver reset={resetGame} winner={winner} />}
      </div>
      <Log messages={gameTurns} />
    </main>
  );
}
export default App;
