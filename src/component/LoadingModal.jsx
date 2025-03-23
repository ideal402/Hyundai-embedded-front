// src/component/LoadingModal.jsx
import React from "react";
import styled, { keyframes } from "styled-components";

const fadeIn = keyframes`
  from { opacity: 0; }
  to   { opacity: 1; }
`;

const Spinner = keyframes`
  0%   { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

const ModalOverlay = styled.div`
  position: fixed;
  z-index: 9999;
  top: 0; left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  align-items: center;
  justify-content: center;
  animation: ${fadeIn} 0.3s ease-in-out;
`;

const ModalContent = styled.div`
  background: #111;
  padding: 40px;
  border-radius: 12px;
  text-align: center;
  color: #fff;
  box-shadow: 0 0 15px rgba(255, 255, 255, 0.2);
`;

const LoadingCircle = styled.div`
  margin: 0 auto 20px;
  border: 6px solid #444;
  border-top: 6px solid #00d1ff;
  border-radius: 50%;
  width: 48px;
  height: 48px;
  animation: ${Spinner} 1s linear infinite;
`;

const LoadingText = styled.div`
  font-size: 1.2rem;
  font-weight: 500;
`;

const LoadingModal = ({ visible }) => {
  if (!visible) return null;

  return (
    <ModalOverlay>
      <ModalContent>
        <LoadingCircle />
        <LoadingText>ESP32 연결 중...</LoadingText>
      </ModalContent>
    </ModalOverlay>
  );
};

export default LoadingModal;
