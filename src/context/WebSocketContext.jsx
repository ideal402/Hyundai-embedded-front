// src/context/WebSocketContext.jsx
import React, { createContext, useEffect, useState } from "react";

export const WebSocketContext = createContext();

export const WebSocketProvider = ({ children }) => {
  const [connected, setConnected] = useState(false);
  const [socketInstance, setSocketInstance] = useState(null);

  const sendMessage = (messageObj) => {
    if (socketInstance && socketInstance.readyState === WebSocket.OPEN) {
      socketInstance.send(JSON.stringify(messageObj));
      // console.log("📤 WebSocket 메시지 전송:", messageObj);
    } else {
      console.warn("⚠️ WebSocket이 연결되지 않았습니다.");
    }
  };

  useEffect(() => {
    const socket = new WebSocket("wss://hyundai-app-cf6af1f123b1.herokuapp.com/ws");
    console.log("🧩 WebSocket 생성 시도");

    socket.onopen = () => {
      console.log("✅ WebSocket 연결됨");
      socket.send(JSON.stringify({ type: "register", role: "web" }));
      setSocketInstance(socket);
    };

    socket.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        // console.log("📩 메시지 수신:", data);

        if (data.type === "sensor") {
          setConnected(true);
        }
      } catch (err) {
        console.error("메시지 파싱 오류:", err);
      }
    };

    socket.onclose = () => {
      console.log("❌ WebSocket 연결 종료");
      setConnected(false);
    };

    return () => {
      socket.close();
      console.log("🔌 WebSocket 종료");
    };
  }, []);



  return (
    <WebSocketContext.Provider value={{ socket: socketInstance, connected, sendMessage }}>
      {children}
    </WebSocketContext.Provider>
  );
};
