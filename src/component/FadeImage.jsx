import React from "react";
import { Container, BlackOverlay, ImageLayer } from "./FadeImage.style";

const FadeImage = () => {
  return (
    <Container>
      <ImageLayer />
      <BlackOverlay />
    </Container>
  );
};

export default FadeImage;
