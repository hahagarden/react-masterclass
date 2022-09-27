import { useQuery } from "@tanstack/react-query";
import { fetchCoinHistory } from "./api";
import ApexChart from "react-apexcharts";
import { getValue } from "@testing-library/user-event/dist/utils";
import { validateLocaleAndSetLanguage } from "typescript";

interface ChartProps {
  coinId: string;
  isDarked: boolean;
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

function Chart({ coinId, isDarked }: ChartProps) {
  const { isLoading, data } = useQuery<IData[]>(["ohlcv", coinId], () =>
    fetchCoinHistory(coinId)
  );

  return (
    <div>
      {isLoading ? (
        "Loading chart..."
      ) : (
        <ApexChart
          type="line"
          width="500"
          series={[
            {
              name: "Price",
              data: data?.map((price) => parseFloat(price.close)) ?? [],
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
            },
            fill: {
              type: "gradient",
              gradient: {
                gradientToColors: ["#0652DD"],
                stops: [0, 100],
              },
            },
            grid: { show: false },
            colors: ["#ED4C67"],
            stroke: {
              width: 5,
              curve: "smooth",
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
            tooltip: {
              x: {},
              y: {
                formatter: (value) => `$${value.toFixed(3)}`,
              },
            },
          }}
        />
      )}
    </div>
  );
}

export default Chart;
