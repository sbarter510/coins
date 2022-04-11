//1. Import coingecko-api
const CoinGecko = require("coingecko-api");
const express = require("express");
const CORS = require("cors");

const app = express();
app.use(CORS());
app.use(express.json());

//2. Initiate the CoinGecko API Client
const CoinGeckoClient = new CoinGecko();

//all coins
app.get("/", async (req, res) => {
  const page = req.query.page;
  let data = await CoinGeckoClient.coins.all({
    per_page: 2,
    page: `${page ? page : 1}`,
  });
  res.json(data);
});

// 7 day weekly data
app.get("/fetchRange", async (req, res) => {
  const coinName = req.query.coin_name;
  var today = Math.floor(new Date().getTime() / 1000);
  var oneWeekAgo = new Date();
  oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
  oneWeekAgo = Math.floor(oneWeekAgo.getTime() / 1000);

  let data = await CoinGeckoClient.coins.fetchMarketChartRange(coinName, {
    from: oneWeekAgo,
    to: today,
    vs_currency: "usd",
  });
  return res.json(data);
});

//global data
app.get("/global", async (req, res) => {
  let data = await CoinGeckoClient.global();
  res.json(data);
});

// coin summary data

app.get("/summary/:coin_name", async (req, res) => {
  const coinName = req.params.coin_name;
  console.log(coinName);
  let data = await CoinGeckoClient.coins.fetchMarketChart(coinName, {
    // days: days ? days : "1",
  });

  res.json(data);
});

app.listen(5000, () => {
  console.log("Server started on port 5000");
  return;
});
