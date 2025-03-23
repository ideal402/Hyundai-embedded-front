import styled, { keyframes } from "styled-components";

// 배경 밝기 애니메이션
const brighten = keyframes`
  from {
    filter: brightness(30%);
  }
  to {
    filter: brightness(100%);
  }
`;

// 텍스트 페이드 업
const fadeUp = keyframes`
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

export const IntroContainer = styled.div`
  position: relative;
  width: 100%;
  height: 100vh;
  background-image: url("assets/image.jpg");
  background-size: cover;
  background-position: center;
  font-family: 'Pretendard', sans-serif;
  display: flex;
  align-items: center;
  justify-content: center;
  animation: ${brighten} 3s ease forwards;
`;

export const Overlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(17, 17, 17, 0.4); /* 살짝 어두운 필터 */
`;

export const IntroContent = styled.div`
  position: relative;
  z-index: 1;
  text-align: center;
  color: white;
`;

// 메인 타이틀: 가장 먼저 나옴
export const IntroMainTitle = styled.h1`
  font-size: 5rem;
  letter-spacing: 3px;
  margin-bottom: 16px;
  opacity: 0;
  animation: ${fadeUp} 1s ease forwards;
  animation-delay: 0.5s;
`;

// 서브타이틀: 1초 뒤에 나옴
export const IntroSubtitle = styled.p`
  font-size: 1.5rem;
  margin-bottom: 30px;
  opacity: 0;
  letter-spacing: 2px;
  animation: ${fadeUp} 1s ease forwards;
  animation-delay: 1.5s;
`;

export const EnterButton = styled.button`
  background: transparent;
  color: white;
  border: 1px solid white;
  padding: 10px 30px;
  font-size: 1rem;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.3s ease;
  opacity: 0;
  animation: ${fadeUp} 1s ease forwards;
  animation-delay: 1.8s;

  &:hover {
    background-color: #8B0000;
    color: white;
    box-shadow: 0 0 10px rgba(255, 77, 77, 0.6);
  }

  &:active {
    transform: scale(0.98);
  }
`;
