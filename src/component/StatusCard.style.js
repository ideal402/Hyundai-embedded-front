import styled from "styled-components";

export const StatusCardContainer = styled.div`
  display: flex;
  flex-direction: column;
  background-color: #222;
  width: 100%;
  min-height: 400px;
  /* height: 100%; */
  padding: 20px;
  border-radius: 12px;
  margin-bottom: 20px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.3);
`;

export const StatusTitle = styled.h3`
  font-size: 1.2rem;
  height: 7%;
  margin-bottom: 10px;
`;

export const StatusValue = styled.p`
  font-size: 1.2rem;
  font-weight: bold;
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
`;
export const ChartContainer = styled.div`
  flex-grow: 1;
  width: 100%;
`

export const StatusArea = styled.div`
  height: 8%;
  display: flex;
  justify-content: space-between;

`