import styled from "styled-components";

export const MonitorContainer = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  height: 100vh;
  background-color: #111;
  color: white;
  padding: 20px;
  font-family: "Pretendard", sans-serif;
  overflow-y: auto;
  margin: 0 auto;
  padding: 0 20px;
  @media (min-width: 1200px) {
    max-width: 1320px;
  }

  @media (min-width: 992px) and (max-width: 1199px) {
    max-width: 960px;
  }

  @media (min-width: 768px) and (max-width: 991px) {
    max-width: 720px;
  }

  @media (max-width: 767px) {
    max-width: 100%;
    padding: 0 12px;
  }
`;

export const DeviceSection = styled.div`
  width: 30%;
  height: calc(100% - 20px);
  margin-top: 10px;
  margin-bottom: 10px;
  padding: 20px;
  background-color: #222;
  border-radius: 12px;
  display: flex;
  flex-direction: column;
  align-items: center;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.3);
  overflow-y: auto;
`;


export const SystemStatusSection = styled.div`
  width: 70%;
  min-height: 100%;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;
  padding: 10px 20px 10px 20px;
  overflow-y: auto;

    /* ✅ 태블릿 이하부터 1열로 */
  @media (max-width: 1199px) {
    grid-template-columns: repeat(1, 1fr);
  }
`;
