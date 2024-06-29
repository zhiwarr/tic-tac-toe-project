export default function GameBoard({onSelect,board}) {
    return (
        <ol id="game-board">
            {board.map((gameBoardRow, gameBoardIndex) => (
                <li key={gameBoardIndex}>
                    <ol>
                        {gameBoardRow.map((playerSymbol, playerSymbolIndex) => (
                            <li key={playerSymbolIndex}>
                                <button onClick={()=>onSelect(gameBoardIndex,playerSymbolIndex)} disabled={playerSymbol !==null}>
                                    {playerSymbol}
                                </button>
                            </li>
                        ))}
                    </ol>
                </li>
            ))}
        </ol>
    );
}
