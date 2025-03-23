import styled, { keyframes } from "styled-components";

// 검정 배경: 1 → 0
const fadeBlack = keyframes`
  0%   { opacity: 1; }
  60%  { opacity: 0.5; }
  100% { opacity: 0; }
`;

// 이미지: 0 → 1 → 0 (0.5 타이밍 맞춰 시작)
const fadeImage = keyframes`
  0%   { opacity: 1; }
  60%  { opacity: 1; }
  100% { opacity: 0; }
`;

export const Container = styled.div`
  position: fixed;
  z-index: 9999;
  width: 100vw;
  height: 100vh;
  top: 0;
  left: 0;
  pointer-events: none;
`;

export const BlackOverlay = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  background: black;
  animation: ${fadeBlack} 2s ease-in-out forwards;
`;

export const ImageLayer = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  background-image: url("/assets/loading.jpg"); // ← 이미지 경로 수정
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  filter: brightness(1) contrast(1.5) saturate(1.2); // 💡 대비 향상!
  animation: ${fadeImage} 2s ease-in-out forwards;
`;
