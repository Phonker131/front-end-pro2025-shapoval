import express from "express";
import Todo from "../models/Todo.js";

const router = express.Router();

router.post("/", async (req, res) => {
    try {
        const todo = new Todo(req.body);
        const saved = await todo.save();
        res.json(saved);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

router.get("/", async (req, res) => {
    const todos = await Todo.find().sort("-createdAt");
    res.json(todos);
});

router.put("/:id", async (req, res) => {
    try {
        const updated = await Todo.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(updated);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

router.delete("/:id", async (req, res) => {
    try {
        await Todo.findByIdAndDelete(req.params.id);
        res.json({ message: "Deleted" });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

export default router;
