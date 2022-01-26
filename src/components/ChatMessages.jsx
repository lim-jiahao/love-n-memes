import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';
import axios from 'axios';

const ChatMessages = ({ matchId, user }) => {
  const [socket, setSocket] = useState();
  const [messages, setMessages] = useState([]);
  const [typedMsg, setTypedMsg] = useState('');

  useEffect(() => {
    let resp;
    (async () => {
      resp = await axios.get(`/api/message/${matchId}`);
      const prevMsgs = resp.data.messages.map((msg) => `${msg.sender}: ${msg.body}`);
      setMessages(prevMsgs);
    })();
    const newSocket = io();
    newSocket.emit('subscribe', matchId);

    newSocket.on('chatMessage', ([msg, username]) => {
      setMessages((prevState) => [...prevState, `${username}: ${msg}`]);
    });

    setSocket(newSocket);
    return () => newSocket.close();
  }, [matchId]);

  const handleMsgSend = async (e) => {
    e.preventDefault();

    if (typedMsg === '') return;
    try {
      const data = { message: typedMsg, user };
      const resp = await axios.post(`/api/message/${matchId}`, data);
      if (resp.data.message.body) {
        socket.emit('chat', [resp.data.message.body, user]);
        setTypedMsg('');
      }
    } catch (err) {
      console.error(err.response);
    }
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
