import { useLocation } from "react-router-dom";
import styled, { keyframes } from "styled-components";

const animation = keyframes`
  0%{
    opacity:0%;
    transform: translateY(100%);
  }
  50%{
    opacity:100%;
    transform: translateY(-50%);
  }
  100%{
    transform:translateY(0)
  };
`;

interface IStatePrice {
  priceData: {
    name: string;
    quotes: {
      USD: {
        price: number;
        volume_24h: number;
        volume_24h_change_24h: number;
        market_cap: number;
        market_cap_change_24h: number;
        percent_change_15m: number;
        percent_change_30m: number;
        percent_change_1h: number;
        percent_change_6h: number;
        percent_change_12h: number;
        percent_change_24h: number;
        percent_change_7d: number;
        percent_change_30d: number;
        percent_change_1y: number;
        ath_price: number;
        ath_date: string;
        percent_from_price_ath: number;
      };
    };
  };
}

const Box = styled.div`
  animation: ${animation} 0.5s ease-out;
  display: flex;
  justify-content: space-between;
  border-size: box-sizing;
  background-color: rgba(0, 0, 0, 0.2);
  span {
    padding: 10px;
    &:last-child {
      font-size: 18px;
    }
  }
`;
const Arrow = styled.span<{ color: string }>`
  color: ${(props) => props.color};
`;

function Price() {
  const { state } = useLocation<IStatePrice>();
  const prices = state.priceData.quotes.USD;
  return (
    <>
      <Box>
        <span>PERCENTAGE CHANGE 15 min</span>
        <span>
          {prices.percent_change_15m > 0 ? (
            <Arrow color="red">▲</Arrow>
          ) : (
            <Arrow color="blue">▼</Arrow>
          )}
          {`${prices.percent_change_15m} %`}
        </span>
      </Box>
      <Box>
        <span>PERCENTAGE CHANGE 1 hour</span>
        <span>
          {prices.percent_change_1h > 0 ? (
            <Arrow color="red">▲</Arrow>
          ) : (
            <Arrow color="blue">▼</Arrow>
          )}
          {`${prices.percent_change_1h} %`}
        </span>
      </Box>
      <Box>
        <span>PERCENTAGE CHANGE 24 hour</span>
        <span>
          {prices.percent_change_24h > 0 ? (
            <Arrow color="red">▲</Arrow>
          ) : (
            <Arrow color="blue">▼</Arrow>
          )}
          {`${prices.percent_change_24h} %`}
        </span>
      </Box>
      <Box>
        <span>PERCENTAGE CHANGE 7 day</span>
        <span>
          {prices.percent_change_7d > 0 ? (
            <Arrow color="red">▲</Arrow>
          ) : (
            <Arrow color="blue">▼</Arrow>
          )}
          {`${prices.percent_change_7d} %`}
        </span>
      </Box>
      <Box>
        <span>PERCENTAGE CHANGE 30 day</span>
        <span>
          {prices.percent_change_30d > 0 ? (
            <Arrow color="red">▲</Arrow>
          ) : (
            <Arrow color="blue">▼</Arrow>
          )}
          {`${prices.percent_change_30d} %`}
        </span>
      </Box>
      <Box>
        <span>PERCENTAGE CHANGE 1 year</span>
        <span>
          {prices.percent_change_1y > 0 ? (
            <Arrow color="red">▲</Arrow>
          ) : (
            <Arrow color="blue">▼</Arrow>
          )}
          {`${prices.percent_change_1y} %`}
        </span>
      </Box>
    </>
  );
}

export default Price;
