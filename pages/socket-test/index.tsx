import { SOCKET_CONNECT_URL } from "@/config/constants";
import { ChangeEvent, useState } from "react";
import { Manager } from "socket.io-client";

const Socket = () => {
  const [message, setMessage] = useState<string>('')
  const [showMessage, setShowMessage] = useState<string>('')

  const manager = new Manager(SOCKET_CONNECT_URL, {
    path: '/ssi1-socket',
    forceNew: true,
  })
  const socket = manager.socket('/sockets/message')

  socket.on("recieved_test", (newMessage) => {
    setShowMessage(newMessage);
    setMessage('')
  });

  const handleChange = (event: ChangeEvent<HTMLSelectElement | HTMLInputElement>) => {
    const inputField = event.target.name;
    const inputValue = event.target.value;

    setMessage(inputValue)
  };

  const handleSubmit = () => {
    socket.emit('send-test', message);
  }

  return (
    <div className="m-12">
      <input value={message} type="text" onChange={handleChange} />
      <button onClick={handleSubmit}>submit</button>
      <div>
        {showMessage}
      </div>
    </div>
  )
};

export default Socket;
