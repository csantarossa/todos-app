const express = require("express");
const mongodb = require("mongodb");
const cors = require("cors");
require("dotenv").config();
const { connectToMongoDB } = require("./database");
const path = require("path");
const { mongoose } = require("mongoose");
const cookieParser = require("cookie-parser");

mongoose.connect(process.env.MONGODB_URI);

const app = express();
const corsOptions = {
  origin: "https://todos-app-01qu.onrender.com/",
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));

app.use(express.static(path.join(__dirname, "build")));
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "build/index.html"));
});

// middleware
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));

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
