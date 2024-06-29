export default function Log({messages}){
    return(
      <ol id="log">
       {messages.map((message,index)=>{
        const {row,col} = message.square;
         return <li key={`${col}${row}`}>{"player :"+message.player +" hits row "+(row+1) +" and col " + (col+1)}</li>
       })}
      </ol>
    );
}