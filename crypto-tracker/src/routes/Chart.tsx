import { useQuery } from "@tanstack/react-query";
import { fetchCoinHistory } from "./api";
import ApexChart from "react-apexcharts";
import { getValue } from "@testing-library/user-event/dist/utils";
import { validateLocaleAndSetLanguage } from "typescript";
import { useRecoilValue } from "recoil";
import { isDarkAtom } from "../atoms";

interface ChartProps {
  coinId: string;
}

interface IData {
  close: string;
  high: string;
  low: string;
  market_cap: number;
  open: string;
  time_close: number;
  time_open: number;
  volume: string;
}

function Chart({ coinId }: ChartProps) {
  const { isLoading, data } = useQuery<IData[]>(["ohlcv", coinId], () =>
    fetchCoinHistory(coinId)
  );
  const isDarked = useRecoilValue(isDarkAtom);

  return (
    <div>
      {isLoading ? (
        "Loading chart..."
      ) : (
        <ApexChart
          type="candlestick"
          width="500"
          series={[
            {
              data:
                data?.map((price) => {
                  return {
                    x: price.time_open * 1000,
                    y: [
                      parseFloat(price.open),
                      parseFloat(price.high),
                      parseFloat(price.low),
                      parseFloat(price.close),
                    ],
                  };
                }) ?? [],
            },
          ]}
          options={{
            theme: {
              mode: isDarked ? "dark" : "light",
            },
            chart: {
              background: "transparent",
              height: 500,
              width: 500,
              toolbar: {
                show: false,
              },
              animations: {
                speed: 200,
              },
            },
            grid: { show: false },
            colors: ["#ED4C67"],
            stroke: {
              width: 1,
            },
            xaxis: {
              axisBorder: { show: false },
              axisTicks: { show: false },
              labels: { show: false },
              type: "datetime",
              categories: data?.map((price) => price.time_close * 1000) ?? [],
            },
            yaxis: {
              show: false,
            },
          }}
        />
      )}
    </div>
  );
}

export default Chart;
