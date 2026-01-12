import express from "express";
import Comment from "../models/comment.js";

//console.log("COMMENTS ROUTER LOADED");

const router = express.Router();


router.post("/", async (req, res) => {
    try {
        const comment = await Comment.create(req.body);
        res.status(200).json(comment);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

router.get("/", async (req, res) => {
    try {
        const comments = await Comment.find();
        res.status(200).json(comments);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});


router.get("/post/:postId", async (req, res) => {
    try {
        const comments = await Comment.find({
            post: req.params.postId,
        }).populate("author");
        res.json(comments);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});


export default router;