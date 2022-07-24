import styled from "styled-components";

const Father = styled.div`
  display: flex;
`; //styled-components를 이용하면 자동으로 랜덤 class 생성해줌
const Box = styled.div`
  background-color: ${(props) => props.bgColor};
  width: 100px;
  height: 100px;
`; //component props 사용
const Text = styled.h1`
  color: white;
`;
const Circle = styled(Box)`
  border-radius: 50px;
`; //component 확장, props 속성 설정 가능
const Btn = styled.button`
  color: white;
  background-color: tomato;
  border: 0;
  border-radius: 15px;
`; //as="a" props HTML tag 바꿔줌
const Input = styled.input.attrs({ required: true, minLength: 5 })`
  background-color: teal;
  color: white;
`; //css뿐만 아니라 attrs({}) JS속성도 설정 가능

function App() {
  return (
    <Father>
      <Box bgColor="teal">
        <Text>Hello</Text>
      </Box>
      <Circle bgColor="tomato" />
      <Btn>Log in</Btn>
      <Btn as="a" href="#">
        Log in
      </Btn>
      <Input />
      <Input />
    </Father>
  );
}

export default App;

/*  <div style={{ display: "flex" }}>
      <div style={{ backgroundColor: "teal", width: 100, height: 100 }}></div>
      <div style={{ backgroundColor: "tomato", width: 100, height: 100 }}></div>
    </div> */
