import express from "express";
import Comment from "../models/comment.js";



const router = express.Router();

//#CREATE
router.post("/", async (req, res) => {
    try {
        const comment = await Comment.create(req.body);
        const populatedComment = await comment.populate("author");
        res.status(200).json(populatedComment);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

//#FETCH ALL
router.get("/", async (req, res) => {
    try {
        const comments = await Comment.find();
        res.status(200).json(comments);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

//#FETCH BY POST ID
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

//#EDIT
router.put("/:commentId", async (req, res) => {
    try {
        const updatedComment = await Comment.findByIdAndUpdate(
            req.params.commentId,
            { content: req.body.content },
            { new: true, runValidators: true }
        ).populate("author");

        if (!updatedComment) {
            return res.status(404).json({ error: "Comment not found" });
        }

        res.json(updatedComment);
    } catch (err) {
        res.status(404).json({ error: err.message });
    }
});

//#DELETE
router.delete("/:commentId", async (req, res) => {
    try {
        const comment = await Comment.findByIdAndDelete(req.params.commentId);

        if (!comment) {
            return res.status(404).json({ error: "Comment not found " });
        }

        res.json({ message: "Comment deleted" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});


export default router;