import express from "express";
import Like from "../models/like.js";
import Post from "../models/post.js"
import requireAuth from "../middleware/requireAuth.js";


const router = express.Router();


router.post("/", requireAuth, async (req, res) => {
    try {
        const user = req.user._id;
        const { post } = req.body;

        const existingLike = await Like.findOne({ user, post });
        const targetPost = await Post.findById(post);

        if (!targetPost) {
            return res.status(409).json({ error: "Post not found" });
        }
        let liked;

        if (existingLike) {
            await existingLike.deleteOne();
            targetPost.likesCount -= 1;
            liked = false;
        } else {
            await Like.create({ user, post });
            targetPost.likesCount += 1;
            liked = true;
        }
        await targetPost.save();

        res.json({
            liked,
            likesCount: targetPost.likesCount,
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.get("/post/:postId", async (req, res) => {
    try {
        const likes = await Like.find({
            post: req.params.postId,
        }).populate("user");
        res.json(likes);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

export default router;