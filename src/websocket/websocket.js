// src/websocket/wsClient.js
let socket = null;

const connectWebSocket = (onMessage, onOpen, onClose) => {
  socket = new WebSocket("wss://hyundai-app-cf6af1f123b1.herokuapp.com");

  socket.onopen = () => {
    socket.send(JSON.stringify({ type: "register", role: "web" }));
    onOpen?.();
  };

  socket.onmessage = (event) => {
    onMessage?.(event.data);
  };

  socket.onclose = () => {
    onClose?.();
  };
};

const sendCommand = (command) => {
  if (socket && socket.readyState === WebSocket.OPEN) {
    socket.send(JSON.stringify({"type":"command","command":command}));
    
  } else {
    console.warn("WebSocket이 아직 열려있지 않습니다");
  }
};

const closeWebSocket = () => {
  if (socket) {
    socket.close();
  }
};

export { connectWebSocket, sendCommand, closeWebSocket };
