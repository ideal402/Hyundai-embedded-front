import styled from "styled-components";

export const Button = styled.button`
    height: 20%;
  background: transparent;
  color: white;
  border: 2px solid #aaaaaa;
  padding: 10px 20px;
  font-size: 1rem;
  font-family: 'Pretendard', sans-serif;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s ease;
  margin-top: 16px;

  &:hover {
    background: #8B0000;
    color: #fff;
    box-shadow: 0 0 10px rgba(255, 77, 77, 0.6);
  }

  &:active {
    transform: scale(0.98);
  }
`;