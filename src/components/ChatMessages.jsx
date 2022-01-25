import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';

const ChatMessages = ({ id, user }) => {
  const [socket, setSocket] = useState();
  const [messages, setMessages] = useState([]);
  const [typedMsg, setTypedMsg] = useState('');

  useEffect(() => {
    const newSocket = io();
    newSocket.emit('subscribe', id);

    newSocket.on('chatMessage', ([msg, username]) => {
      setMessages((prevState) => [...prevState, `${username}: ${msg}`]);
    });

    setSocket(newSocket);
    return () => newSocket.close();
  }, [id]);

  const handleMsgSend = (e) => {
    e.preventDefault();

    if (typedMsg === '') return;

    socket.emit('chat', [typedMsg, user]);
    setTypedMsg('');
  };

  return (
    <div>
      {messages.length > 0 ? (
        <ul>
          {messages.map((message) => (
            <li>{message}</li>
          ))}
        </ul>
      ) : (
        <p>No messages exchanged yet! Don't be shy.</p>
      )}
      <form onSubmit={handleMsgSend}>
        <input className="border-solid border-2 border-sky-500" value={typedMsg} onChange={(e) => setTypedMsg(e.target.value)} />
        <input type="submit" value="Send" />
      </form>

    </div>
  );
};

export default ChatMessages;
