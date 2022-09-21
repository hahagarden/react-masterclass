import styled, { keyframes } from "styled-components";

const Wrapper = styled.div`
  display: flex;
`;

const animation = keyframes`
from{
  transform:rotate(0deg)
}
to{
  transform:rotate(360deg)
}
`;

const Box = styled.div`
  height: 200px;
  width: 200px;
  background-color: tomato;
  animation: ${animation} 1s linear infinite;
`;

function App() {
  return (
    <Wrapper>
      <Box />
    </Wrapper>
  );
}

export default App;
