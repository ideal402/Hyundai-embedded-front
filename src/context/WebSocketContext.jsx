import React, { createContext, useEffect, useRef, useState } from "react";

export const WebSocketContext = createContext();

export const WebSocketProvider = ({ children }) => {
  const [connected, setConnected] = useState(false);
  const [socketInstance, setSocketInstance] = useState(null); // ✅ 상태로 관리

  useEffect(() => {
    const socket = new WebSocket("wss://hyundai-app-cf6af1f123b1.herokuapp.com/ws");

    socket.onopen = () => {
      socket.send(JSON.stringify({ type: "register", role: "web" }));
      console.log("WebSocket 연결됨");
    };

    socket.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);

        if (data.type === "sensor") {
          setConnected(true);
        }
      } catch (err) {
        console.error("WebSocket 파싱 오류:", err);
      }
    };

    socket.onclose = () => {
      console.log("WebSocket 연결 종료");
      setConnected(false);
    };

    setSocketInstance(socket); // ✅ 연결 후 상태로 반영

    return () => {
      socket.close();
    };
  }, []);

  return (
    <WebSocketContext.Provider value={{ socket: socketInstance, connected }}>
      {children}
    </WebSocketContext.Provider>
  );
};
