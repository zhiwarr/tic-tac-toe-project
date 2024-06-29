export default function GameOver({winner,reset}){
  return (
    <div id="game-over">
   <h2>Game Over</h2>
   <h2>
    {winner && <p>Winner is {winner}</p>}
    {!winner && <p>DRAW</p>}
   </h2>
   <button onClick={reset}>Play Again</button>
    </div>
  );
}