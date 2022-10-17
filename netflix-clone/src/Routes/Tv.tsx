import styled from "styled-components";
import {
  getDataLatestShow,
  getDataTopRatedShow,
  getDataAiringTodayShow,
  getDataPopularShow,
  IDataShow,
} from "../api";
import { useQuery } from "react-query";
import { makeImagePath } from "./utils";
import { motion, AnimatePresence, useScroll } from "framer-motion";
import { useNavigate, useMatch } from "react-router-dom";
import TvSlider from "./TvSlider";

const genreArr: { [key: number]: string } = {
  10759: "Action & Adventure",
  16: "Animation",
  35: "Comedy",
  80: "Crime",
  99: "Documentary",
  18: "Drama",
  10751: "Family",
  10762: "Kids",
  9648: "Mystery",
  10763: "News",
  10764: "Reality",
  10765: "Sci-Fi & Fantasy",
  10766: "Soap",
  10767: "Talk",
  10768: "War & Politics",
  37: "Western",
};

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

const BigShow = styled(motion.div)`
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

const BigInfo = styled.div`
  position: relative;
  top: -70px;
  width: 100%;
  display: flex;
  flex-direction: column;
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
    margin-right: 15px;
  }
`;

const BigOverview = styled.p`
  margin: 0px 5px;
  padding: 10px 20px;
  color: ${(props) => props.theme.white.light};
`;

function Tv() {
  const navigator = useNavigate();
  const { scrollY } = useScroll();

  const { data: dataAiringToday, isLoading: isLoadingAiringToday } =
    useQuery<IDataShow>(["shows", "airingToday"], getDataAiringTodayShow);
  const { data: dataTopRated, isLoading: isLoadingTopRated } =
    useQuery<IDataShow>(["shows", "topRated"], getDataTopRatedShow);
  const { data: dataPopular, isLoading: isLoadingPopular } =
    useQuery<IDataShow>(["shows", "popular"], getDataPopularShow);

  const bigShowMatch = useMatch("/tv/:name/:showId");
  const overlayClicked = () => {
    navigator("/tv");
  };
  const whichData =
    bigShowMatch?.params.name === "AiringToday"
      ? dataAiringToday
      : bigShowMatch?.params.name === "TopRated"
      ? dataTopRated
      : bigShowMatch?.params.name === "Popular"
      ? dataPopular
      : null;
  const clickedShow =
    bigShowMatch?.params.showId &&
    whichData?.results.find(
      (show) => show.id + "" === bigShowMatch.params.showId
    );

  return (
    <Wrapper>
      {isLoadingAiringToday && isLoadingTopRated && isLoadingPopular ? (
        <Loader>Loading...</Loader>
      ) : (
        <>
          <Banner
            $bgPhoto={makeImagePath(
              dataAiringToday?.results[0].backdrop_path || ""
            )}
          >
            <Title>{dataAiringToday?.results[0].name}</Title>
            <Overview>{dataAiringToday?.results[0].overview}</Overview>
          </Banner>
          <Sliders>
            <TvSlider data={dataAiringToday} name="Airing Today" />
            <TvSlider data={dataPopular} name="Popular" />
            <TvSlider data={dataTopRated} name="Top Rated" />
          </Sliders>
          <AnimatePresence>
            {bigShowMatch ? (
              <>
                <Overlay
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onClick={overlayClicked}
                />
                <BigShow
                  style={{ top: scrollY.get() + 100 }}
                  layoutId={`${bigShowMatch.params.name}_${bigShowMatch.params.showId}`}
                >
                  {clickedShow && (
                    <>
                      <BigImage
                        style={{
                          backgroundImage: `linear-gradient(to top,black,transparent),url(${makeImagePath(
                            clickedShow.backdrop_path,
                            "w500"
                          )})`,
                        }}
                      />
                      <BigTitle>{clickedShow.name}</BigTitle>
                      <BigInfo>
                        <BigTimes>
                          <span>
                            {clickedShow.first_air_date?.split("-")[0] || null}
                          </span>
                          <span>{clickedShow.origin_country}</span>
                        </BigTimes>
                        <BigGenre>
                          {clickedShow.genre_ids.map((num) => (
                            <span>{genreArr[num]}</span>
                          ))}
                        </BigGenre>
                        <BigOverview>{clickedShow.overview}</BigOverview>
                      </BigInfo>
                    </>
                  )}
                </BigShow>
              </>
            ) : null}
          </AnimatePresence>
        </>
      )}
    </Wrapper>
  );
}

export default Tv;
