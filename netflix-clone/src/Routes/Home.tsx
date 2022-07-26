import styled from "styled-components";
import {
  getDataNowPlayingMovie,
  getDataTopRatedMovie,
  getDataUpcomingMovie,
  getDataLatestMovie,
  INowPlayingMovie,
  IDataMovie,
} from "../api";
import { useQuery } from "react-query";
import { makeImagePath } from "./utils";
import { motion, AnimatePresence, useScroll } from "framer-motion";
import { useState } from "react";
import { useNavigate, useMatch } from "react-router-dom";
import MovieSlider from "./MovieSlider";
import { movieGenreArr } from "./utils";

const Wrapper = styled.div`
  background-color: black;
  height: 100vh;
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

const Sliders = styled.div`
  position: relative;
  top: -120px;
`;

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
  height: 70vh;
  background-color: rgba(30, 30, 30, 1);
  border-radius: 20px;
  right: 0;
  left: 0;
  margin: 0 auto;
`;

const BigImage = styled.div`
  width: 100%;
  height: 600px;
  background-size: cover;
  background-position: center center;
`;

const BigTitle = styled.h3`
  color: ${(props) => props.theme.white.light};
  position: relative;
  top: -90px;
  padding: 20px;
  font-size: 48px;
  font-weight: 500;
`;

const BigInfo = styled.div`
  position: relative;
  top: -70px;
  width: 100%;
  display: flex;
  flex-direction: column;
  font-size: 20px;
`;

const BigTimes = styled.div`
  margin: 5px;
  padding: 0 20px;
  display: flex;
  align-items: center;
  span {
    font-weight: 500;
    margin-right: 15px;
  }
`;

const BigGenre = styled.div`
  margin: 5px;
  padding: 0 20px;
  display: flex;
  align-items: center;
  span {
    font-weight: 500;
    margin-right: 10px;
  }
`;

const BigOverview = styled.p`
  margin: 0px 5px;
  padding: 10px 20px;
  color: ${(props) => props.theme.white.light};
`;

function Home() {
  const navigator = useNavigate();
  const { scrollY } = useScroll();

  const { data: dataNowPlaying, isLoading: isLoadingNowPlaying } =
    useQuery<INowPlayingMovie>(
      ["movies", "nowPlaying"],
      getDataNowPlayingMovie
    );
  const { data: dataTopRated, isLoading: isLoadingTopRated } =
    useQuery<IDataMovie>(["movies", "topRated"], getDataTopRatedMovie);
  const { data: dataUpcoming, isLoading: isLoadingUpcoming } =
    useQuery<INowPlayingMovie>(["movies", "upcoming"], getDataUpcomingMovie);
  const { data: dataLatest, isLoading: isLoadingLatest } = useQuery<IDataMovie>(
    ["movies", "latest"],
    getDataLatestMovie
  );

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
  console.log(clickedMovie);
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
            <MovieSlider data={dataNowPlaying} name="Now Playing" />
            <MovieSlider data={dataTopRated} name="Top Rated" />
            <MovieSlider data={dataUpcoming} name="Upcoming" />
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
                          backgroundImage: `linear-gradient(to top, rgba(30, 30, 30, 1),transparent),url(${makeImagePath(
                            clickedMovie.backdrop_path,
                            "w780"
                          )})`,
                        }}
                      />
                      <BigTitle>{clickedMovie.title}</BigTitle>
                      <BigInfo>
                        <BigTimes>
                          <span>
                            {clickedMovie.release_date?.split("-")[0] || null}
                          </span>
                          <span>
                            {clickedMovie.adult ? (
                              <img
                                style={{ width: "20px", height: "20px" }}
                                src="https://cdn-icons-png.flaticon.com/512/8068/8068011.png"
                              />
                            ) : (
                              <img
                                style={{ width: "20px", height: "20px" }}
                                src="	https://cdn-icons-png.flaticon.com/512/1688/1688198.png"
                              />
                            )}
                          </span>
                        </BigTimes>
                        <BigGenre>
                          {clickedMovie.genre_ids.map((num) => (
                            <span key={num}>{movieGenreArr[num]}</span>
                          ))}
                        </BigGenre>
                        <BigOverview>{clickedMovie.overview}</BigOverview>
                      </BigInfo>
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
