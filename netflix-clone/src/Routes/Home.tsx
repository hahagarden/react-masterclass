import styled from "styled-components";
import {
  getDataNowPlaying,
  getDataTopRated,
  getDataUpcoming,
  getDataLatest,
  INowPlaying,
  ITopRated,
} from "../api";
import { useQuery } from "react-query";
import { makeImagePath } from "./utils";
import { motion, AnimatePresence, useScroll } from "framer-motion";
import { useState } from "react";
import { useNavigate, useMatch } from "react-router-dom";
import Slider from "./Slider";

const Wrapper = styled.div`
  background-color: black;
  height: 200vh;
`;

const Loader = styled.div`
  height: 20vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Banner = styled.div<{ $bgPhoto: string }>`
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 60px;
  background-image: linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 1)),
    url(${(props) => props.$bgPhoto});
  background-size: cover;
`;

const Title = styled.h2`
  font-size: 68px;
  margin-bottom: 20px;
`;

const Overview = styled.p`
  font-size: 24px;
  width: 50%;
`;

const Sliders = styled.div``;

const Overlay = styled(motion.div)`
  position: fixed;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.6);
  opacity: 0;
`;

const BigMovie = styled(motion.div)`
  position: absolute;
  width: 40vw;
  height: 80vh;
  background-color: ${(props) => props.theme.black.light};
  border-radius: 20px;
  right: 0;
  left: 0;
  margin: 0 auto;
`;

const BigImage = styled.div`
  width: 100%;
  height: 350px;
  background-size: cover;
  background-position: center center;
`;

const BigTitle = styled.h3`
  color: ${(props) => props.theme.white.light};
  position: relative;
  top: -75px;
  padding: 20px;
  font-size: 36px;
  font-weight: 500;
`;

const BigOverview = styled.p`
  position: relative;
  top: -75px;
  padding: 10px 20px;
  color: ${(props) => props.theme.white.light};
`;

function Home() {
  const navigator = useNavigate();
  const { scrollY } = useScroll();

  const { data: dataNowPlaying, isLoading: isLoadingNowPlaying } =
    useQuery<INowPlaying>(["movies", "nowPlaying"], getDataNowPlaying);
  const { data: dataTopRated, isLoading: isLoadingTopRated } =
    useQuery<ITopRated>(["movies", "topRated"], getDataTopRated);
  const { data: dataUpcoming, isLoading: isLoadingUpcoming } =
    useQuery<ITopRated>(["movies", "upcoming"], getDataUpcoming);
  const { data: dataLatest, isLoading: isLoadingLatest } =
    useQuery<INowPlaying>(["movies", "latest"], getDataLatest);

  const bigMovieMatch = useMatch("/movies/:name/:movieId");
  const overlayClicked = () => {
    navigator("/");
  };
  const whichData =
    bigMovieMatch?.params.name === "NowPlaying"
      ? dataNowPlaying
      : bigMovieMatch?.params.name === "TopRated"
      ? dataTopRated
      : bigMovieMatch?.params.name === "Upcoming"
      ? dataUpcoming
      : null;
  const clickedMovie =
    bigMovieMatch?.params.movieId &&
    whichData?.results.find(
      (movie) => movie.id + "" === bigMovieMatch.params.movieId
    );

  return (
    <Wrapper>
      {isLoadingNowPlaying && isLoadingTopRated && isLoadingUpcoming ? (
        <Loader>Loading...</Loader>
      ) : (
        <>
          <Banner
            $bgPhoto={makeImagePath(
              dataNowPlaying?.results[0].backdrop_path || ""
            )}
          >
            <Title>{dataNowPlaying?.results[0].title}</Title>
            <Overview>{dataNowPlaying?.results[0].overview}</Overview>
          </Banner>
          <Sliders>
            <Slider data={dataNowPlaying} name="Now Playing" />
            <Slider data={dataTopRated} name="Top Rated" />
            <Slider data={dataUpcoming} name="Upcoming" />
          </Sliders>
          <AnimatePresence>
            {bigMovieMatch ? (
              <>
                <Overlay
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onClick={overlayClicked}
                />
                <BigMovie
                  style={{ top: scrollY.get() + 100 }}
                  layoutId={`${bigMovieMatch.params.name}_${bigMovieMatch.params.movieId}`}
                >
                  {clickedMovie && (
                    <>
                      <BigImage
                        style={{
                          backgroundImage: `linear-gradient(to top,black,transparent),url(${makeImagePath(
                            clickedMovie.backdrop_path,
                            "w500"
                          )})`,
                        }}
                      />
                      <BigTitle>{clickedMovie.title}</BigTitle>
                      <BigOverview>{clickedMovie.overview}</BigOverview>
                    </>
                  )}
                </BigMovie>
              </>
            ) : null}
          </AnimatePresence>
        </>
      )}
    </Wrapper>
  );
}

export default Home;
