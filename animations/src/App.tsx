import { motion, useMotionValue, useTransform, useScroll } from "framer-motion";
import React, { useEffect, useRef } from "react";
import styled from "styled-components";

const Wrapper = styled(motion.div)`
  height: 200vh;
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const BiggerBox = styled(motion.div)`
  width: 600px;
  height: 600px;
  background-color: rgba(255, 255, 255, 0.4);
  border-radius: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
`;

const Box = styled(motion.div)`
  width: 200px;
  height: 200px;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  background-color: rgba(255, 255, 255, 0.2);
  border-radius: 40px;
  box-shadow: 0 2px 3px rgba(0, 0, 0, 0.1), 0 10px 20px rgba(0, 0, 0, 0.06);
`;

const boxVariants = {
  hover: { scale: 1.5, rotateZ: 90 },
  click: { scale: 1, borderRadius: "100px" },
  drag: { backgroundColor: "rgb(46,204,113)", transition: { duration: 3 } },
};

function App() {
  const a = useMotionValue(0);
  const rotateZ = useTransform(a, [-800, 800], [-360, 360]);
  const gradient = useTransform(
    a,
    [-800, 800],
    [
      "linear-gradient(135deg,rgb(0,210,238),rgb(0,83,238)",
      "linear-gradient(135deg,#63ee00,#eeee00",
    ]
  );
  const { scrollYProgress } = useScroll();
  const scale = useTransform(scrollYProgress, [0, 1], [1, 3]);
  /*   useEffect(() => {
    scrollY.onChange(() => console.log(scrollY.get(), scrollYProgress.get()));
  }, [scrollY, scrollYProgress]); */

  /* useEffect(() => {
    potato.onChange(() => console.log(potato.get()));
  }, [a]); //useMotionValue do not re-render, its value do not change, so use useEffect to get the value. */
  return (
    <Wrapper style={{ background: gradient }}>
      <Box drag="x" style={{ x: a, rotateZ, scale: scale }} dragSnapToOrigin />
    </Wrapper>
  );
}

export default App;
