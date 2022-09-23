import styled from "styled-components";
import { useState } from "react";

interface ContainerProps {
  bgColor: string;
  borderColor: string;
}

const Container = styled.div<ContainerProps>`
  width: 200px;
  height: 200px;
  border-radius: 50%;
  border: 1px solid ${(props) => props.borderColor};
  background-color: ${(props) => props.bgColor};
`; //styled-components and interface

interface CircleProps {
  bgColor: string;
  borderColor?: string;
  text?: string;
} //optional props

function Circle({ bgColor, borderColor, text = "default text" }: CircleProps) {
  const [counter, setCounter] = useState(1);
  return (
    <Container bgColor={bgColor} borderColor={borderColor ?? bgColor}>
      {text}
    </Container>
  ); //??nullish coalescing operator because borderColor in Container is required.
}

export default Circle;
