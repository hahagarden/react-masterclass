import styled, { keyframes } from "styled-components";

const Wrapper = styled.div`
  display: flex;
  width: 100%;
  height: 100vh;
  justify-content: center;
  align-items: center;
`;

const animation = keyframes`
0% {
  transform:rotate(0deg);
  border-radius:0px;
}
50% {
  transform:rotate(360deg);
  border-radius:100px;
}
100%{
  transform:rotate(0deg);
  border-radius:0px;
}`;

const Emoji = styled.span`
  font-size: 50px;
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
      font-size: 10px;
    }
  }
`; //Emoji(styled component) 자체도 targetting 가능
/* 
${Emoji}:hover{
  font-size: 10px;
} another pseudo-selector
*/

function App() {
  return (
    <Wrapper>
      <Box>
        <Emoji as="p">🧛‍♂️</Emoji>
      </Box>
      <Emoji>🧚‍♀️</Emoji>
    </Wrapper>
  );
}

export default App;

/*  <div style={{ display: "flex" }}>
      <div style={{ backgroundColor: "teal", width: 100, height: 100 }}></div>
      <div style={{ backgroundColor: "tomato", width: 100, height: 100 }}></div>
    </div> */
