import React from "react";
import styled from "styled-components";

const ModalBackground = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(17, 17, 17, 0.8);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 999;
`;

const ModalBox = styled.div`
  background: #222;
  color: white;
  padding: 30px 40px;
  border-radius: 12px;
  border: 1px solid white;
  text-align: center;
  font-family: 'Pretendard', sans-serif;
`;

const ConfirmButton = styled.button`
  margin-top: 20px;
  padding: 10px 20px;
  background: white;
  color: #222;
  font-weight: bold;
  border: none;
  border-radius: 8px;
  font-family: 'Pretendard', sans-serif;
  cursor: pointer;

  &:hover {
    background: #ddd;
  }
`;

function AlertModal({ title, message, onClose }) {
  return (
    <ModalBackground>
      <ModalBox>
        <h2>{title}</h2>
        <p>{message}</p>
        <ConfirmButton onClick={onClose}>확인</ConfirmButton>
      </ModalBox>
    </ModalBackground>
  );
}

export default AlertModal;
