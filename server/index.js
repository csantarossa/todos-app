const express = require("express");
const mongodb = require("mongodb");
const cors = require("cors");
require("dotenv").config();
const { connectToMongoDB } = require("./database");
const path = require("path");

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, "build")));
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "build/index.html"));
});

const router = require("./routes");

app.use("/api", router);

const port = process.env.PORT || 8000;

async function startServer() {
  await connectToMongoDB();
  app.listen(port, () => {
    console.log(`Server is listening on http://localhost:${port}`);
  });
}

startServer();
