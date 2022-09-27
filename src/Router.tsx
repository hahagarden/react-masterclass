import { BrowserRouter, Switch, Route } from "react-router-dom";
import Coin from "./routes/Coin";
import Coins from "./routes/Coins";

interface RouterProps {
  isDarked: boolean;
  onClick: () => void;
}

function Router({ isDarked, onClick }: RouterProps) {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/:coinId">
          <Coin isDarked={isDarked} />
        </Route>
        <Route path="/">
          <Coins onClick={onClick} />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default Router;
