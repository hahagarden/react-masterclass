import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./Components/Header";
import Home from "./Routes/Home";
import Search from "./Routes/Search";
import Tv from "./Routes/Tv";

function App() {
  return (
    <Router basename={process.env.PUBLIC_URL}>
      <Header />
      <Routes>
        <Route path="/tv/" element={<Tv />}>
          <Route path=":name/:showId" element={<Tv />} />
        </Route>
        <Route path="/search/" element={<Search />}>
          <Route path=":name/:searchId" element={<Search />} />
        </Route>
        <Route path="/" element={<Home />}>
          <Route path="/movies/:name/:movieId" element={<Home />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
