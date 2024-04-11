const express = require("express");
const { getConnectedClient } = require("./database");
const router = express.Router();
const { ObjectId } = require("mongodb");

const getCollection = () => {
  const client = getConnectedClient();
  const collection = client.db("todosdb").collection("todos");
  return collection;
};

// GET /todos
router.get("/todos", async (req, res) => {
  const collection = getCollection();
  const todos = await collection.find({}).toArray();

  res.status(200).json(todos);
});

// POST /todos
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

// DELETE /todos
router.delete("/todos/:id", async (req, res) => {
  const collection = getCollection();
  const _id = new ObjectId(req.params.id);

  const deletedTodo = await collection.deleteOne({ _id });

  res.status(200).json(deletedTodo);
});

// PUT /todos STATUS
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

// Update Todo
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
