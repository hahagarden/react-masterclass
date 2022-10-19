import { useLocation } from "react-router-dom";
import styled from "styled-components";
import {
  getSearchMovie,
  getSearchShow,
  IDataShow,
  INowPlayingMovie,
  IDataMovie,
} from "../api";
import { makeImagePath, tvGenreArr, movieGenreArr } from "./utils";
import { motion, AnimatePresence, useScroll } from "framer-motion";
import { useState } from "react";
import { useNavigate, useMatch } from "react-router-dom";
import { useQueries, useQuery } from "react-query";
import SearchSlider from "./SearchSlider";

const Wrapper = styled.div`
  width: 100%;
  position: relative;
  top: 100px;
  background-color: black;
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

function Search() {
  const { search } = useLocation();
  const keyword = new URLSearchParams(search).get("keyword");
  const { data: dataMovie, isLoading: isLoadingMovie } = useQuery<IDataMovie>(
    ["search", "movies"],
    () => getSearchMovie(keyword)
  );
  const { data: dataShow, isLoading: isLoadingShow } = useQuery<IDataShow>(
    ["search", "shows"],
    () => getSearchShow(keyword)
  );
  const navigator = useNavigate();
  const { scrollY } = useScroll();
  const bigSearchMatch = useMatch(`/search/:name/:searchId`);
  const overlayClicked = () => {
    navigator(`/search?keyword=${keyword}`);
  };
  const clickedContent =
    bigSearchMatch?.params.searchId &&
    (bigSearchMatch?.params.name === "Movie"
      ? dataMovie?.results.find(
          (content) => content.id + "" === bigSearchMatch.params.searchId
        )
      : bigSearchMatch?.params.name === "Show"
      ? dataShow?.results.find(
          (content) => content.id + "" === bigSearchMatch.params.searchId
        )
      : null);

  return (
    <Wrapper>
      <SearchSlider data={dataMovie} name="Movie" keyword={keyword} />
      <SearchSlider data={dataShow} name="Show" keyword={keyword} />
      <AnimatePresence>
        {bigSearchMatch ? (
          <>
            <Overlay
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={overlayClicked}
            />
            <BigMovie
              style={{ top: scrollY.get() + 100 }}
              layoutId={`${bigSearchMatch.params.name}_${bigSearchMatch.params.searchId}`}
            >
              {clickedContent && (
                <>
                  <BigImage
                    style={{
                      backgroundImage: `linear-gradient(to top, rgba(30, 30, 30, 1),transparent),url(${makeImagePath(
                        clickedContent.backdrop_path
                      )})`,
                    }}
                  />
                  <BigTitle>{clickedContent.title}</BigTitle>
                  <BigInfo>
                    <BigTimes>
                      <span>
                        {bigSearchMatch?.params.name === "Movie"
                          ? clickedContent.release_date?.split("-")[0]
                          : bigSearchMatch?.params.name === "Show"
                          ? clickedContent.first_air_date?.split("-")[0]
                          : null}
                      </span>
                      {bigSearchMatch?.params.name === "Movie" ? (
                        <span>
                          {clickedContent.adult ? (
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
                      ) : null}
                    </BigTimes>
                    <BigGenre>
                      {clickedContent.genre_ids.map((num) => (
                        <span key={num}>
                          {bigSearchMatch?.params.name === "Movie"
                            ? movieGenreArr[num]
                            : bigSearchMatch?.params.name === "Show"
                            ? tvGenreArr[num]
                            : null}
                        </span>
                      ))}
                    </BigGenre>
                    <BigOverview>{clickedContent.overview}</BigOverview>
                  </BigInfo>
                </>
              )}
            </BigMovie>
          </>
        ) : null}
      </AnimatePresence>
    </Wrapper>
  );
}

export default Search;
