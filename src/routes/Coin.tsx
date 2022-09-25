import { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import styled from "styled-components";

interface Params {
  coinId: string;
}

const Container = styled.div`
  padding: 0 20px;
  max-width: 480px;
  margin: 0 auto;
`;

const Header = styled.header`
  height: 15vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Title = styled.h1`
  color: ${(props) => props.theme.accentColor};
  font-size: 48px;
`;

const Loader = styled.div`
  text-align: center;
  font-size: 20px;
`;

const Overview = styled.div`
  background-color: black;
  display: flex;
  justify-content: space-between;
  padding: 15px 25px;
  border-radius: 10px;
`;

const OverviewItem = styled.div`
  display: flex;
  flex-direction: column;
  text-align: center;
  span:first-child {
    font-size: 15px;
  }
  span:last-child {
    font-size: 20px;
  }
`;

const Discription = styled.div`
  padding: 20px;
`;

interface RouteState {
  name: string;
}

interface IInfoData {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  is_new: boolean;
  is_active: boolean;
  type: string;
  logo: string;
  description: string;
  message: string;
  open_source: boolean;
  started_at: string;
  development_status: string;
  hardware_wallet: boolean;
  proof_type: string;
  org_structure: string;
  hash_algorithm: string;
  first_data_at: string;
  last_data_at: string;
}

interface IPriceData {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  circulating_supply: number;
  total_supply: number;
  max_supply: number;
  beta_value: number;
  first_data_at: string;
  last_updated: string;
  quotes: {
    USD: {
      ath_date: string;
      ath_price: number;
      market_cap: number;
      market_cap_change_24h: number;
      percent_change_1h: number;
      percent_change_1y: number;
      percent_change_6h: number;
      percent_change_7d: number;
      percent_change_12h: number;
      percent_change_15m: number;
      percent_change_24h: number;
      percent_change_30d: number;
      percent_change_30m: number;
      percent_from_price_ath: number;
      price: number;
      volume_24h: number;
      volume_24h_change_24h: number;
    };
  };
}

function Coin() {
  const [loading, setLoading] = useState(true);
  const { coinId } = useParams<Params>();
  const { state } = useLocation<RouteState>();
  const [info, setInfo] = useState<IInfoData>();
  const [priceInfo, setPriceInfo] = useState<IPriceData>();
  useEffect(() => {
    (async () => {
      const infoData = await (
        await fetch(`https://api.coinpaprika.com/v1/coins/${coinId}`)
      ).json();
      const priceData = await (
        await fetch(`https://api.coinpaprika.com/v1/tickers/${coinId}`)
      ).json();
      setInfo(infoData);
      setPriceInfo(priceData);
      setLoading(false);
    })();
  }, []);
  return (
    <Container>
      <Header>
        <Title>Coin {state?.name || "Loading..."}</Title>
      </Header>
      {loading ? <Loader>Loading...</Loader> : null}
      <Overview>
        <OverviewItem>
          <span>RANK:</span>
          <span>{info?.rank}</span>
        </OverviewItem>
        <OverviewItem>
          <span>SYMBOL:</span>
          <span>{info?.symbol}</span>
        </OverviewItem>
        <OverviewItem>
          <span>OPEN SOURCE:</span>
          <span>{info?.open_source ? "YES" : "NO"}</span>
        </OverviewItem>
      </Overview>
      <Discription>{info?.description}</Discription>
      <Overview>
        <OverviewItem>
          <span>TOTAL SUPPLY:</span>
          <span>{priceInfo?.total_supply}</span>
        </OverviewItem>
        <OverviewItem>
          <span>MAX SUPPLY:</span>
          <span>{priceInfo?.max_supply}</span>
        </OverviewItem>
      </Overview>
    </Container>
  );
}

export default Coin;
