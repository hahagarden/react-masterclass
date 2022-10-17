import styled from "styled-components";
import {
  getDataNowPlayingMovie,
  getDataTopRatedMovie,
  INowPlayingMovie,
  ITopRatedMovie,
  IDataShow,
  IShow,
} from "../api";
import { makeImagePath } from "./utils";
import { motion, AnimatePresence, useScroll } from "framer-motion";
import { useState } from "react";
import { useNavigate, useMatch } from "react-router-dom";

const SliderWrapper = styled.div`
  position: relative;
  top: -100px;
  display: flex;
  flex-direction: column;
  padding: 20px 0px;
`;

const SliderTitle = styled.h3`
  font-size: 30px;
  font-weight: 500;
  padding: 20px 30px;
`;

const SliderBox = styled.div`
  position: relative;
  height: 200px;
`;

const Row = styled(motion.div)`
  width: 100%;
  display: grid;
  gap: 5px;
  grid-template-columns: repeat(6, 1fr);
  position: absolute;
`;

const Box = styled(motion.div)<{ $bgPhoto: string }>`
  background-color: white;
  height: 200px;
  font-size: 40px;
  background-image: url(${(props) => props.$bgPhoto});
  background-size: cover;
  background-position: center center;
  cursor: pointer;
  &:first-child {
    transform-origin: center left;
  }
  &:last-child {
    transform-origin: center right;
  }
`;

const boxVariants = {
  normal: { scale: 1 },
  hover: {
    scale: 1.3,
    y: -50,
    transition: {
      delay: 0.3,
      duration: 0.3,
      type: "tween",
    },
  },
};

const rowVariants = {
  hidden: {
    x: window.outerWidth + 5,
  },
  visible: {
    x: 0,
  },
  exit: { x: -window.outerWidth - 5 },
};

const Info = styled(motion.div)`
  width: 100%;
  padding: 10px;
  background-color: ${(props) => props.theme.black.light};
  opacity: 0;
  position: absolute;
  bottom: 0;
  h4 {
    text-align: center;
    font-size: 18px;
  }
`;

const infoVariants = {
  hover: {
    opacity: 1,
    transition: {
      delay: 0.3,
      duration: 0.3,
      type: "tween",
    },
  },
};

interface ISlider {
  data?: IDataShow;
  name: string;
}

function TvSlider({ data, name }: ISlider) {
  const [index, setIndex] = useState(0);
  const [leaving, setLeaving] = useState(false);
  const toggleLeaving = () => setLeaving((prev) => !prev);
  const offset = 6;
  const navigator = useNavigate();
  const increaseIndex = () => {
    if (data) {
      if (leaving) return;
      toggleLeaving();
      const totalShows = data?.results.length - 1;
      const maxIndex = Math.floor(totalShows / offset) - 1;
      setIndex((prev) => (index === maxIndex ? 0 : prev + 1));
    }
  };
  const showClicked = (showId: number) => {
    navigator(`/tv/${name.replace(" ", "")}/${showId}`);
  };

  return (
    <>
      <SliderWrapper>
        <SliderTitle onClick={increaseIndex}>{name}</SliderTitle>
        <SliderBox>
          <AnimatePresence initial={false} onExitComplete={toggleLeaving}>
            <Row
              variants={rowVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              transition={{ type: "tween", duration: 1 }}
              key={index}
            >
              {data?.results
                .slice(1)
                .slice(offset * index, offset * index + offset)
                .map((show) => (
                  <Box
                    layoutId={`${name.replace(" ", "")}_${show.id}`}
                    variants={boxVariants}
                    key={show.id}
                    initial="normal"
                    whileHover="hover"
                    transition={{ type: "tween" }}
                    onClick={() => showClicked(show.id)}
                    $bgPhoto={makeImagePath(show.backdrop_path, "w500")}
                  >
                    <Info variants={infoVariants}>
                      <h4>{show.name}</h4>
                    </Info>
                  </Box>
                ))}
            </Row>
          </AnimatePresence>
        </SliderBox>
      </SliderWrapper>
    </>
  );
}

export default TvSlider;
