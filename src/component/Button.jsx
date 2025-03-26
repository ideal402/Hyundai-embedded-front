// src/components/Button.jsx
import React, { useContext } from "react";
import styled from "styled-components";
import { WebSocketContext } from "../context/WebSocketContext";

const ButtonStyle = styled.button`
  height: 100%;
  width: 100%;
  background: transparent;
  color: white;
  border: 2px solid #aaaaaa;
  padding: 10px 20px;
  font-size: 1rem;
  font-family: 'Pretendard', sans-serif;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background: #8B0000;
    color: #fff;
    box-shadow: 0 0 10px rgba(255, 77, 77, 0.6);
  }

  &:active {
    transform: scale(0.98);
  }
`;
const Button = ({ command, label , fontsize="1rem" }) => {
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
    <ButtonStyle style={{ fontSize: fontsize }} onClick={handleClick}>
      {label || command}
    </ButtonStyle>
  );
};

export default Button;
