import styled from "styled-components";

export const MonitorContainer = styled.div`
  display: flex;
  flex-direction: row;
  width: 100vw;
  height: 100vh;
  background-color: #111;
  color: white;
  padding: 20px;
  font-family: "Pretendard", sans-serif;
`;

export const DeviceSection = styled.div`
  width: 30%;
  padding: 20px;
  background-color: #222;
  border-radius: 12px;
  display: flex;
  flex-direction: column;
  align-items: center;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.3);
`;


export const SystemStatusSection = styled.div`
  width: 70%;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;
  padding: 20px;
`;
