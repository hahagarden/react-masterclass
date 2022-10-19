import { useLocation } from "react-router-dom";
import styled from "styled-components";
import { IDataShow, IDataMovie } from "../api";
import { makeImagePath } from "./utils";
import { motion, AnimatePresence, useScroll } from "framer-motion";
import { useState } from "react";
import { useNavigate, useMatch } from "react-router-dom";
import { useQueries, useQuery } from "react-query";

const SliderWrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: 20px 0px;
`;

const SliderTitle = styled.h3`
  font-size: 30px;
  font-weight: 500;
  padding: 20px 30px;
  display: flex;
  justify-content: space-between;
  span {
    &:last-child {
      color: gray;
    }
  }
`;

const SliderBox = styled.div`
  position: relative;
  height: 300px;
`;

const Row = styled(motion.div)`
  width: 100%;
  display: grid;
  gap: 5px;
  grid-template-columns: repeat(4, 1fr);
  position: absolute;
`;

const Box = styled(motion.div)<{ $bgPhoto: string }>`
  background-color: white;
  height: 300px;
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
  background-image: linear-gradient(to top, rgba(0, 0, 0, 0.7), transparent);
  opacity: 0;
  position: absolute;
  bottom: 0;
  h4 {
    text-align: center;
    font-size: 24px;
    font-weight: 500;
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

interface ISearchData {
  data?: IDataMovie | IDataShow;
  name: string;
  keyword: string | null;
}

function SearchSlider({ data, name, keyword }: ISearchData) {
  const [index, setIndex] = useState(0);
  const [leaving, setLeaving] = useState(false);
  const toggleLeaving = () => setLeaving((prev) => !prev);
  const offset = 4;
  const navigator = useNavigate();
  const increaseIndex = () => {
    if (data) {
      if (leaving) return;
      toggleLeaving();
      const totalMovies = data?.results.length;
      const maxIndex = Math.floor(totalMovies / offset) - 1;
      setIndex((prev) => (index === maxIndex ? 0 : prev + 1));
    }
  };
  const movieClicked = (movieId: number) => {
    navigator(`/search/${name.replace(" ", "")}/${movieId}`);
  };
  return (
    <>
      <SliderWrapper>
        <SliderTitle onClick={increaseIndex}>
          <span>{name}</span>
          <span>≫</span>
        </SliderTitle>
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
                .slice(offset * index, offset * index + offset)
                .map((movie) => (
                  <Box
                    layoutId={`${name.replace(" ", "")}_${movie.id}`}
                    variants={boxVariants}
                    key={movie.id}
                    initial="normal"
                    whileHover="hover"
                    transition={{ type: "tween" }}
                    onClick={() => movieClicked(movie.id)}
                    $bgPhoto={makeImagePath(movie.backdrop_path)}
                  >
                    <Info variants={infoVariants}>
                      {movie.title ? (
                        <h4>{movie.title}</h4>
                      ) : (
                        <h4>{movie.name}</h4>
                      )}
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

export default SearchSlider;
