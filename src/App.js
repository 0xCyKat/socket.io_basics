import io from "socket.io-client"
import { useState, useEffect } from 'react'
const socket = io.connect("http://localhost:3001")

function App() {
  const [message, setmessage] = useState("");
  const [msgRec, setmsgRec] = useState("");

  useEffect(()=>{
    socket.on('receive_message', (data)=>{
      setmsgRec(data); 
    })
  }, [socket])

  const sendMessage = () => {
    socket.emit("send_message", { message: message })
  }

  const changeMsg = (e) => {
    setmessage(e.target.value)
    
  }

  return (
    <div className="App">
      <input className="my-32 mx-5 border px-4 py-2 border-bg-black rounded-lg" type="text" placeholder="Enter your message" onChange={changeMsg} />
      <button className="px-4 py-2 bg-blue-500 font-semibold text-white rounded-lg" onClick={sendMessage} >Send</button>

      <p className="mx-32 my-10 font-semibold w-1/3">{msgRec}</p>
    </div>
  );
}

export default App;
