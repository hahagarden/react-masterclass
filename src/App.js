import styled from "styled-components";

const Father = styled.div`
  display: flex;
`;

const Button = styled.button`
  background-color: ${(props) => props.bgColor};
  width: 100px;
  height: 100px;
`;

const Circle = styled(Button)`
  border-radius: 50%;
`;

function App() {
  return (
    <Father>
      <Button bgColor="teal">Log in</Button>
      <Circle bgColor="tomato">Log in</Circle>
      <Button as="a" href="/" bgColor="teal">
        Log in
      </Button>
    </Father>
  );
} // as="html_tag", change the existing Button html type "button" into anchor "a"

export default App;
