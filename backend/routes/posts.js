import express from "express";
import Post from "../models/post.js"

const router = express.Router();

router.post("/", async (req, res) => {
    try {
        const post = await Post.create(req.body);
        res.status(201).json(post);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});


router.get("/", async (req, res) => {
    try {
        const posts = await Post.find().populate("author");
        res.json(posts);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

export default router;