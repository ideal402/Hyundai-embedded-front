import React from 'react';
import * as S from './Button.style';
import { sendCommand } from '../websocket/websocket';

const Button = ({ command, label }) => {
  const handleClick = () => {
    if (command) {
      sendCommand(command);
    }
  };

  return (
    <S.Button onClick={handleClick}>
      {label || command}
    </S.Button>
  );
};

export default Button;
