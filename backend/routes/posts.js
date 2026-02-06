import express from "express";
import Post from "../models/post.js"
import Comment from "../models/comment.js";
import Like from "../models/like.js";
import requireAuth from "../middleware/requireAuth.js";
const router = express.Router();


//#CREATE
router.post("/", requireAuth, async (req, res) => {
    try {
        const post = await Post.create({
            content: req.body.content,
            author: req.user._id,
        });

        const populatedPost = await post.populate("author", "username");

        res.status(201).json({
            ...populatedPost.toObject(),
            likesCount: 0,
            likedByCurrentUser: false,
            owned: true,
        });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }

});

//#FETCH
router.get("/", requireAuth, async (req, res) => {
    try {
        const posts = await Post.find()
            .sort({ createdAt: -1 })
            .populate("author")
            .lean();

        const likes = await Like.find({ user: req.user._id });
        const likedPostIds = new Set(
            likes.map(like => like.post.toString())
        );

        const postsWithLikes = posts.map(post => ({
            ...post,
            likedByCurrentUser: likedPostIds.has(post._id.toString())
        }));

        res.json(postsWithLikes);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

//#EDIT
router.put("/:postId", requireAuth, async (req, res) => {
    try {
        const post = await Post.findById(req.params.postId);

        if (!post) {
            return res.status(404).json({ error: "Post not found" });
        }

        if (!post.author.equals(req.user._id)) {
            return res.status(403).json({ error: "Not allowed" });
        }

        post.content = req.body.content;
        await post.save();

        const populatedPost = await post.populate("author");
        res.json(populatedPost);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

//#DELETE
router.delete("/:postId", requireAuth, async (req, res) => {
    try {
        const post = await Post.findById(req.params.postId);

        if (!post) {
            return res.status(404).json({ error: "Post not found" });
        }

        if (!post.author.equals(req.user._id)) {
            return res.status(403).json({ error: "Not allowed" });
        }

        await post.deleteOne();

        await Comment.deleteMany({ post: post._id });
        await Like.deleteMany({ post: post._id });

        res.json({ message: "Post deleted" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

export default router;