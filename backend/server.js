const express = require("express");
const fs = require("fs");
const cors = require("cors");
const path = require("path");

const app = express();
const PORT = 4000;

const filePath = path.join(__dirname, "compliments.json");

app.use(cors());
app.use(express.json());

function readCompliments() {
  try {
    const data = fs.readFileSync(filePath, "utf-8");
    return JSON.parse(data);
  } catch {
    return [];
  }
}

function writeCompliments(data) {
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
}

app.get("/api/compliments", (req, res) => {
  res.json(readCompliments());
});

app.post("/api/compliments", (req, res) => {
  const compliments = readCompliments();
  const newOne = req.body;
  compliments.unshift(newOne);
  writeCompliments(compliments);
  res.json({ success: true });
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
