import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import styled from "styled-components";

const Wrapper = styled(motion.div)`
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Grid = styled.div`
  display: grid;
  width: 50vw;
  grid-template-columns: repeat(2, 1fr);
  gap: 10px;
`;

const Overlay = styled(motion.div)`
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Box = styled(motion.div)`
  height: 200px;
  background-color: rgba(255, 255, 255, 0.5);
  border-radius: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: 0 2px 3px rgba(0, 0, 0, 0.1), 0 10px 20px rgba(0, 0, 0, 0.06);
`;

const boxVar = {
  hover: (n: string) => ({
    scale: n == "1" ? 1.2 : n == "4" ? 1.2 : 1,
  }),
};

const Circle = styled(motion.div)`
  width: 50px;
  height: 50px;
  border-radius: 25px;
  background-color: white;
`;

const Button = styled(motion.button)`
  margin-top: 30px;
  border: none;
  width: 60px;
  height: 30px;
  border-radius: 3px;
  font-size: 15px;
  font-weight: 600;
`;

const buttonVar = {
  start: (circle: boolean) => ({
    scale: circle ? 1 : 1,
    color: circle ? "orange" : "blue",
  }),
  end: (circle: boolean) => ({
    scale: circle ? 1.5 : 1,
    color: circle ? "orange" : "blue",
  }),
};

function App() {
  const [circle, setCircle] = useState(false);
  const [box, setBox] = useState<string | null>(null);
  const toggleCircleClicked = () => {
    setCircle((prev) => !prev);
  };

  return (
    <Wrapper>
      <Grid>
        {["1", "2", "3", "4"].map((n) =>
          n == "2" ? (
            <Box key={n} onClick={() => setBox(n)} layoutId={n}>
              {!circle ? <Circle layoutId="circle" /> : null}
            </Box>
          ) : n == "3" ? (
            <Box key={n} onClick={() => setBox(n)} layoutId={n}>
              {circle ? <Circle layoutId="circle" /> : null}
            </Box>
          ) : (
            <Box
              variants={boxVar}
              custom={n}
              whileHover="hover"
              key={n}
              onClick={() => setBox(n)}
              layoutId={n}
            ></Box>
          )
        )}
        ;
      </Grid>

      <AnimatePresence>
        {box ? (
          <Overlay
            onClick={() => setBox(null)}
            initial={{ backgroundColor: "rgba(0, 0, 0, 0)" }}
            animate={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}
            exit={{ backgroundColor: "rgba(0, 0, 0, 0)" }}
          >
            <Box
              layoutId={box}
              style={{
                width: "350px",
                height: "200px",
                backgroundColor: "white",
              }}
            />
          </Overlay>
        ) : null}
      </AnimatePresence>

      <Button
        onClick={toggleCircleClicked}
        custom={circle}
        variants={buttonVar}
        initial="start"
        animate="end"
      >
        Switch
      </Button>
    </Wrapper>
  );
}

export default App;
