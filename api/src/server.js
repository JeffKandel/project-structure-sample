import http from "http";
import express from "express";

const PORT = 8080;
const DELAY = 100;

const reverse = s => {
  const out = s.split("").reverse().join("");
  return new Promise(resolve => {
    setTimeout(() => resolve(out), DELAY);
  });
};

const lowercase = s => {
  const out = s.toLowerCase()
  return new Promise(resolve => {
    setTimeout(() => resolve(out), DELAY);
  });
};

const app = express();
app.server = http.createServer(app);

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "http://localhost:3000");
  // res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.get("/api/reverse/:something", async (req, res) => {
  const something = req.params.something;
  console.log(`Reversing "${something}"`);
  const reversed = await reverse(something);
  res.json(reversed);
});

app.get("/api/lowercase/:something", async (req, res) => {
  const something = req.params.something;
  console.log(`Converting to lowercase "${something}"`);
  const lowercased = await lowercase(something);
  res.json(lowercased);
});

app.server.listen(PORT);
console.log(`API started on port ${app.server.address().port}`);
