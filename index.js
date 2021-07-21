const express = require("express");
require("dotenv").config();
const fetch = require("node-fetch");
const PORT = process.env.PORT || 5000;
const API_TOKEN = process.env.API_TOKEN;
const cors = require("cors");

const app = express();

app.use(cors());

app.get("/rate", (req, res) => {
  const headers = { Authorization: `Bearer ${API_TOKEN}` };
  fetch("https://api.github.com/rate_limit?", {
    method: "GET",
    headers: headers,
  })
    .then((response) => response.json())
    .then((data) => res.json(data));
});

app.get("/user/:login", (req, res) => {
  const url = `https://api.github.com/users/${req.params.login}`;
  const headers = { Authorization: `Bearer ${API_TOKEN}` };
  fetch(url, {
    method: "GET",
    headers: headers,
  })
    .then((response) => response.json())
    .then((data) => res.json(data));
});

app.listen(PORT, () => console.log(`Listening on ${PORT}`));
