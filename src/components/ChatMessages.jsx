import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';
import axios from 'axios';
import moment from 'moment';
import { ArrowNarrowLeftIcon, PaperAirplaneIcon } from '@heroicons/react/outline';

const ChatMessages = ({ match, setSelectedMatch }) => {
  const [socket, setSocket] = useState();
  const [messages, setMessages] = useState([]);
  const [typedMsg, setTypedMsg] = useState('');
  const [sendDisabled, setSendDisabled] = useState(true);

  useEffect(() => {
    let resp;
    (async () => {
      const headers = { headers: { Authorization: `Bearer ${localStorage.getItem('authToken')}` } };
      resp = await axios.get(`/api/message/${match.id}`, headers);
      console.log(resp);
      setMessages(resp.data.messages);
    })();
    const newSocket = io();
    newSocket.emit('subscribe', match.id);

    newSocket.on('chatMessage', (msg) => {
      setMessages((prevState) => [msg, ...prevState]);
    });

    setSocket(newSocket);
    return () => newSocket.close();
  }, [match.id]);

  const handleMsgType = (e) => {
    setTypedMsg(e.target.value);
    if (e.target.value === '') setSendDisabled(true);
    else setSendDisabled(false);
  };

  const handleMsgSend = async (e) => {
    e.preventDefault();

    if (typedMsg === '') return;
    try {
      const headers = { headers: { Authorization: `Bearer ${localStorage.getItem('authToken')}` } };
      const data = { message: typedMsg };
      const resp = await axios.post(`/api/message/${match.id}`, data, headers);
      if (resp.data.message) {
        socket.emit('chat', resp.data.message);
        setTypedMsg('');
        setSendDisabled(true);
      }
    } catch (err) {
      console.error(err.response);
    }
  };

  const isSentByUser = (msg) => msg.senderId !== match.match.id;

  const getFormattedTime = (time) => {
    const dayStart = moment().startOf('day');
    const momentTime = moment(time);

    if (momentTime >= dayStart) return momentTime.format('HH:mm');

    return momentTime.format('DD/MM HH:mm');
  };

  return (
    <div className="relative flex flex-col items-center w-1/2 h-[60vh] mx-auto">
      <ArrowNarrowLeftIcon className="absolute left-0 top-4 h-6 w-6 hover:bg-gray-300 cursor-pointer" onClick={() => setSelectedMatch(null)} />
      <div className="flex items-center mb-2">
        <img className="w-14 h-14 mr-2 rounded-full border-2 border-black" src={match.match.pictures.length > 0 ? match.match.pictures[0].filename : '/default.jpg'} alt="meme" />
        <p className="font-bold text-sm">{match.match.name}</p>
      </div>
      {messages.length > 0 ? (
        <div className="flex flex-col-reverse min-h-full min-w-full p-1 overflow-auto scrollbar">
          {messages.map((message) => (
            <div className={`${isSentByUser(message) ? 'self-end bg-green-200' : 'self-start bg-gray-300'} max-w-[70%] mb-1 py-1 px-2 rounded`}>
              <p className="break-all">{message.body}</p>
              <p className="text-xs text-right">{getFormattedTime(message.createdAt)}</p>
            </div>
          ))}
        </div>
      ) : (
        <div className="min-h-full min-w-full flex items-center justify-center font-bold">
          <p>No messages exchanged yet! Don't be shy.</p>
        </div>
      )}
      <form className="w-full flex" onSubmit={handleMsgSend}>
        <input className="border-solid border-2 border-sky-500 mr-2 flex-1" value={typedMsg} onChange={handleMsgType} />
        <button type="submit" disabled={sendDisabled}>
          <PaperAirplaneIcon className={`h-7 w-7 rotate-90 ${sendDisabled ? 'text-gray-300' : 'text-green-500'}`} />
          {' '}
        </button>
      </form>

    </div>
  );
};

export default ChatMessages;
