import styled from "styled-components";

// 전체 상태 박스
export const DviceContainer = styled.div`
  height: 55%;
  width: 100%;
  border-radius: 16px;
  padding: 20px;
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(10px);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

// 타이틀
export const DeviceTitle = styled.h2`
  font-size: 1.8rem;
  text-align: center;
  color: #fff;
`;

// 상태 텍스트 그룹
export const DeviceSpecs = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  font-size: 1rem;
  color: #ddd;
  align-items: center;
`;

export const StatusGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
  padding: 10px;
  justify-items: center;
`;

export const StatusItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const StatusLabel = styled.span`
  font-size: 1rem;
  color: #ccc;
  margin-bottom: 4px;
`;

export const StatusValue = styled.span`
  font-size: 1.2rem;
  font-weight: bold;
  color: ${({ isOn }) => (isOn ? '#4caf50' : '#f44336')};
  transition: 0.3s;
`;

export const StatusLoading = styled.p`
  text-align: center;
  font-size: 1rem;
  color: #aaa;
  margin-top: 20px;
`;

export const AnimationContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 140px;
  margin-bottom: 10px;

  img {
    height: 100%;
    object-fit: contain;
  }
`;
export const ButtonContainer = styled.div`
    min-height: 650;
    height: 60%;
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
`