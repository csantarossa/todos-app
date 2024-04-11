const express = require("express");
const mongodb = require("mongodb");
const cors = require("cors");
require("dotenv").config();
const { connectToMongoDB } = require("./database");

const app = express();
app.use(cors());
app.use(express.json());

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
