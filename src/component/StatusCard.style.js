import styled from "styled-components";

export const StatusCardContainer = styled.div`
  display: flex;
  flex-direction: column;
  background-color: #222;
  height: 100%;
  padding: 20px;
  border-radius: 12px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.3);
  border: 1px solid white;
`;

export const StatusTitle = styled.h3`
  font-size: 1.2rem;
  height: 7%;
  margin-bottom: 10px;
  border: 1px solid white;
`;

export const StatusValue = styled.p`
  font-size: 1rem;
  font-weight: bold;
  border: 1px solid white;
  height: 7%;
`;

export const StatusBar = styled.div`
  width: 100%;
  height: 8px;
  border-radius: 4px;
  background: rgba(255, 0, 0, 0.5);
  overflow: hidden;
  margin-top: 8px;
  margin-bottom: 8px;

  &::after {
    content: "";
    display: block;
    width: ${(props) => props.percentage}%;
    height: 100%;
    background: red;
    transition: width 0.3s ease-in-out;
  }
    border: 1px solid white;
`;
export const ChartContainer = styled.div`
  flex-grow: 1;
  width: 100%;
  border: 1px solid white;
`