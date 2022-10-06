import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { RecoilRoot } from "recoil";

const queryClient = new QueryClient();

ReactDOM.render(
  <RecoilRoot>
    <QueryClientProvider client={queryClient}>
      <App />
      <ReactQueryDevtools initialIsOpen={true} />
    </QueryClientProvider>
  </RecoilRoot>,
  document.getElementById("root")
);
