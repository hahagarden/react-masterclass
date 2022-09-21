import styled, { keyframes } from "styled-components";

const Wrapper = styled.div`
  display: flex;
  background-color: ${(props) => props.theme.backgroundColor};
  span {
    color: ${(props) => props.theme.textColor};
  }
`;

const animation = keyframes`
from{
  transform:rotate(0deg)
}
to{
  transform:rotate(360deg)
}
`;

const Emoji = styled.span`
  font-size: 30px;
`;
const Box = styled.div`
  height: 200px;
  width: 200px;
  background-color: tomato;
  animation: ${animation} 1s linear infinite;
  display: flex;
  justify-content: center;
  align-items: center;
  ${Emoji} {
    &:hover {
      font-size: 50px;
    }
    &:active {
      opacity: 0;
    }
  } //pseudo selector
`;

function App() {
  return (
    <Wrapper>
      <Box>
        <Emoji>🤩</Emoji>
      </Box>
      <Emoji>🔥</Emoji>
      <span>hello</span>
    </Wrapper>
  );
}

export default App;
