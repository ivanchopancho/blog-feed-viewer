import express from "express";
import Like from "../models/like.js";


const router = express.Router();


router.post("/", async (req, res) => {
    try {
        const like = await Like.create(req.body);
        res.status(201).json(like);
    } catch (err) {
        if (err.code === 11000) {
            return res.status(409).json({ error: "Already liked" });
        }
        res.status(400).json({ error: err.message });
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