import { useState } from "react";
export default function PlayerInfo({name,symbol,isActive,onChangeName}){
  const [currentPlayerName,setPlayerName] = useState(name);
  const [isEdited,SetIsEdited]  = useState(false);
  function toggleEditing(){
    if(isEdited){
      onChangeName(symbol,currentPlayerName);
    }
    SetIsEdited((editing)=>!editing)
  }
  function updatePlayerName(event){
    setPlayerName(event.target.value);
  }

  let playerName =<span className="player-name">{currentPlayerName}</span>;
  if(isEdited){
    playerName = <input type="text" required value={currentPlayerName} onChange={updatePlayerName}/>;
  }
    return (
        <li className={isActive ? 'active':undefined}>
        <span className="player">
          {playerName}
        <span className="player-symbol">{symbol}</span>
        </span>
        <button onClick={toggleEditing}>{isEdited?'save':'edit'}</button>
      </li>
    );
}