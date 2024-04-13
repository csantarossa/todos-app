const express = require("express");
const { getConnectedClient } = require("./database");
const router = express.Router();
const { ObjectId } = require("mongodb");
const User = require("./userModel");
const bcrypt = require("bcrypt");
const salt = 10;
const jwt = require("jsonwebtoken");

// User Register
router.post("/register", async (req, res) => {
  try {
    const { firstname, lastname, email, password, confirmPassword } = req.body;

    // Check if name was entered
    if (!firstname) {
      return res.json({ error: "Firstname has not been entered." });
    }
    if (!lastname) {
      return res.json({ error: "Lastname has not been entered." });
    }
    if (!email) {
      return res.json({ error: "Email has not been entered." });
    }
    if (!password || password.length < 8) {
      return res.json({
        error: "Password is required and must be at least 8 characters long.",
      });
    }
    if (password !== confirmPassword) {
      return res.json({ error: "Passwords do not match." });
    }

    // Check if email already has account
    const exist = await User.findOne({ email });
    if (exist) {
      return res.json({
        error: "Email is already in use.",
      });
    }

    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await User.create({
      firstname,
      lastname,
      email,
      password: hashedPassword,
    });

    res.json(user);
  } catch (error) {
    console.error(error);
  }
});

// User Login
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      res.json({ error: "No user found." });
    }
    const match = await bcrypt.compare(password, user.password);

    // Set Cookies via JWT token
    if (match) {
      jwt.sign(
        { email: user.email, id: user._id, name: user.firstname },
        process.env.JWT_SECRET,
        {},
        (err, token) => {
          if (err) throw err;
          res.cookie("token", token).json({ user, token });
        }
      );
    } else {
      res.json({ error: "Password is incorrect." });
    }
  } catch (error) {
    console.error(error);
  }
});

// Check if logged in
router.get("/profile", async (req, res) => {
  const { token } = req.cookies;
  if (token) {
    jwt.verify(token, process.env.JWT_SECRET, {}, (err, user) => {
      if (err) throw err;

      res.json(user);
    });
  } else {
    res.json(null);
  }
});

// *** Todos Section
// Create connection to todos db without mongoose
const getCollection = () => {
  const client = getConnectedClient();
  const collection = client.db("todosdb").collection("todos");
  return collection;
};

// GET * from todos
router.get("/todos", async (req, res) => {
  const collection = getCollection();
  const todos = await collection.find({}).toArray();

  res.status(200).json(todos);
});

// POST a todo
router.post("/todos", async (req, res) => {
  try {
    const collection = getCollection();
    let { todo } = req.body;

    if (!todo) {
      return res.status(400).json({ mssg: "Error: No todo found to post." });
    }
    todo = typeof todo === "string" ? todo : JSON.stringify(todo);
    const newTodo = await collection.insertOne({ todo, status: false });

    res.status(201).json({ todo, status: false, _id: newTodo.insertedId });
  } catch (error) {
    console.error(error);
  }
});

// DELETE a todo
router.delete("/todos/:id", async (req, res) => {
  const collection = getCollection();
  const _id = new ObjectId(req.params.id);

  const deletedTodo = await collection.deleteOne({ _id });

  res.status(200).json(deletedTodo);
});

// PUT todo status
router.put("/todos/:id", async (req, res) => {
  const collection = getCollection();
  const _id = new ObjectId(req.params.id);
  const { status } = req.body;

  if (typeof status !== "boolean") {
    return res.status(400).json({ mssg: "Error: Invalid status" });
  }

  const updatedTodo = await collection.updateOne(
    { _id },
    { $set: { status: !status } }
  );

  res.status(200).json(updatedTodo);
});

// PUT todo content
router.put("/todos/update/:id", async (req, res) => {
  try {
    const collection = getCollection();
    const _id = new ObjectId(req.params.id);
    const { updatedTodo } = req.body;

    const updateTask = await collection.updateOne(
      { _id },
      { $set: { todo: updatedTodo } }
    );
    res.status(200).json(updateTask);
  } catch (error) {
    console.error(error);
  }
});

module.exports = router;
