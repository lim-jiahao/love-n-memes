const initialiseChatSockets = (io) => {
  io.on('connection', (socket) => {
    let chatRoom = 'default';

    socket.on('subscribe', (room) => {
      chatRoom = room;
      socket.join(room);
    });

    socket.on('chat', (msg) => {
      io.to(chatRoom).emit('chatMessage', msg);
    });

    socket.on('disconnect', () => {});
  });
};

export default initialiseChatSockets;
