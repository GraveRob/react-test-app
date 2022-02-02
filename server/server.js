'use strict';
const express = require('express');
const http = require('http');
const io = require('socket.io');
const cors = require('cors');

const FETCH_INTERVAL = 5000;
const PORT = process.env.PORT || 4000;

const tickers = [
  'AAPL', // Apple
  'GOOGL', // Alphabet
  'MSFT', // Microsoft
  'AMZN', // Amazon
  'FB', // Facebook
  'TSLA', // Tesla
];
let storageDisabledTickers = [];

function randomValue(min = 0, max = 1, precision = 0) {
  const random = Math.random() * (max - min) + min;
  return random.toFixed(precision);
}

function utcDate() {
  const now = new Date();
  return new Date(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate(), now.getUTCHours(), now.getUTCMinutes(), now.getUTCSeconds());
}

function getQuotes(socket) {

  const quotes = tickers.map((ticker, index) => {   //переделать через тернарный
    const access = !storageDisabledTickers.includes(index);

    return ({
    ticker,
    exchange: access ? 'NASDAQ' : 'Denied',
    price: access ? randomValue(100, 300, 2) : 0,
    change: access ? randomValue(0, 200, 2) : 0,
    change_percent: access ? randomValue(0, 1, 2) : 0,
    dividend: access ? randomValue(0, 1, 2) : 0,
    yield: access ? randomValue(0, 2, 2) : 0,
    last_trade_time: access ? utcDate() : "2021-01-01T01:01:01.000Z",
    })
  });
  
  socket.emit('ticker', quotes);
}

function trackTickers(socket) {
  // run the first time immediately
  getQuotes(socket);

  // every N seconds
  const timer = setInterval(function() {
    getQuotes(socket);
  }, FETCH_INTERVAL);

  socket.on('disconnect', function() {
    clearInterval(timer);
  });
}

const app = express();
app.use(cors());
const server = http.createServer(app);

const socketServer = io(server, {
  cors: {
    origin: "*",
  }
});

app.get('/', function(req, res) {
  res.sendFile(__dirname + '/index.html');
});

socketServer.on('connection', (socket) => {
  trackTickers(socket);

  socket.on('disabled', (disabledTickers) => {
    storageDisabledTickers = [];
    for(let i = 0; i < disabledTickers.length; i++) {
      storageDisabledTickers[i] = disabledTickers[i];
    }
  });
});

server.listen(PORT, () => {
  console.log(`Streaming service is running on http://localhost:${PORT}`);
});