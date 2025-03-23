// src/components/Button.jsx
import React, { useContext } from "react";
import * as S from "./Button.style";
import { WebSocketContext } from "../context/WebSocketContext";

const Button = ({ command, label }) => {
  const { sendMessage } = useContext(WebSocketContext);

  const handleClick = () => {
    if (command) {
      sendMessage({
        type: "command",
        command,
      });
    }
  };

  return (
    <S.Button onClick={handleClick}>
      {label || command}
    </S.Button>
  );
};

export default Button;
