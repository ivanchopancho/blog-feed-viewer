import express from "express";
import Post from "../models/post.js"
import Comment from "../models/comment.js";
import Like from "../models/like.js";

const router = express.Router();


//#CREATE
router.post("/", async (req, res) => {
    try {
        const post = await Post.create(req.body);
        res.status(201).json(post);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

//#FETCH
router.get("/", async (req, res) => {
    try {
        const posts = await Post.find().populate("author");
        res.json(posts);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

//#EDIT
router.put("/:postId", async (req, res) => {
    try {
        const updatedPost = await Post.findByIdAndUpdate(
            req.params.postId,
            { content: req.body.content },
            { new: true, runValidators: true }
        ).populate("author");

        if (!updatedPost) {
            return res.status(404).json({ error: "Post not found " });
        }

        res.json(updatedPost);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

//#DELETE
router.delete("/:postId", async (req, res) => {
    try {
        const post = await Post.findByIdAndDelete(req.params.postId);

        if (!post) {
            return res.status(404).json({ error: "Post not found" });
        }

        //prevents orphaned data (likes and posts)
        await Comment.deleteMany({ post: post._id });
        await Like.deleteMany({ post: post._id });

        res.json({ message: "Post deleted" });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

export default router;