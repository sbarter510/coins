import logo from "./logo.svg";
import "./App.scss";
import axios from "axios";
import { useEffect } from "react";
import AppContainer from "./components/AppContainer/AppContainer";
import HeaderStats from "./components/Header/HeaderStats";
import Header from "./components/Header/Header";
import { store } from "./redux/store";
import { Provider } from "react-redux";
import Coins from "./components/Coins/Coins";
import CoinSummary from "./components/CoinSummary/CoinSummary";

import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Provider store={store}>
          <HeaderStats />
          <AppContainer>
            <Header />
            <Routes>
              <Route path="/" element={<Coins />}></Route>
              <Route path="/summary/:coin" element={<CoinSummary />}></Route>
            </Routes>
          </AppContainer>
        </Provider>
      </div>
    </BrowserRouter>
  );
}

export default App;
