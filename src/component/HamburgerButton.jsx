// src/component/HamburgerButton.jsx
import React from "react";
import styled from "styled-components";

const Container = styled.div`
  position: absolute;
  top: 40px;
  left: 40px;
  z-index: 10;
`;

const Button = styled.button`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 24px;
  height: 18px;
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;

  span {
    height: 3px;
    background-color: white;
    border-radius: 2px;
  }
`;

const HamburgerButton = ({ onClick }) => {
  return (
    <Container>
      <Button onClick={onClick}>
        <span />
        <span />
        <span />
      </Button>
    </Container>
  );
};

export default HamburgerButton;
