export async function fetchCoins() {
  const response = await fetch("https://api.coinpaprika.com/v1/coins");
  const json = await response.json();
  return json;
}

export function fetchCoinInfo(coinId: string) {
  return fetch(`https://api.coinpaprika.com/v1/coins/${coinId}`).then(
    (response) => response.json()
  );
}

export function fetchCoinPriceInfo(coinId: string) {
  return fetch(`https://api.coinpaprika.com/v1/tickers/${coinId}`).then(
    (response) => response.json()
  );
}
