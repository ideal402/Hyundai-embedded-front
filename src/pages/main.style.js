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
  position: relative;
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
  display: flex;
  flex-direction: column;
  /* grid-template-columns: repeat(2, 1fr); */

  padding: 10px 20px 10px 20px;
  overflow-y: auto;

    /* ✅ 태블릿 이하부터 1열로 */
  /* @media (max-width: 1199px) {
    grid-template-columns: repeat(1, 1fr);
  } */
`;
export const StatusTop = styled.div`
  width: 100%;
  min-height: 65px;
  background-color: #222;
  border-radius: 12px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.3);
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
`

export const StatusLeft = styled.div`
  min-width: 100px;
  height: 100%;
  padding: 20px;
  font-size: 1.2rem;
  font-weight: bold;
  display: flex;
  align-items: center;
`
export const StatusRight = styled.div`
  min-width: 100px;
  height: 100%;
  padding: 20px;
  font-size: 1.2rem;
  font-weight: bold;
  display: flex;
  align-items: center;
  justify-content: flex-end;
`
export const ToggleButton = styled.button`
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  color: white;
`;

export const TopCardArea = styled.div`
  display: flex;
  justify-content: space-around;
  gap: 20px;
  overflow: hidden;
  transition: 
    min-height 1s ease,
    margin-bottom 0.5s ease;
  min-height: 400px;    
  height: 400px;
  margin-bottom: 20px;

  &[data-visible="false"] {
    min-height: 0;
    height: 0;
    opacity: 0;
    margin-bottom: 0;
  }
`;

export const HamburgerMenu = styled.div`
  position: absolute;
  top: 65px;
  left: 40px;
  width: 150px;
  background-color: #333;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0,0,0,0.2);
  padding: 10px;
  display: flex;
  flex-direction: column;
  gap: 8px;
  z-index: 9;
`;

export const MenuButton = styled.button`
  background-color: #444;
  color: white;
  border: none;
  padding: 8px 12px;
  border-radius: 6px;
  cursor: pointer;
  font-size: 0.9rem;

  &:hover {
    background-color: #666;
  }
`;