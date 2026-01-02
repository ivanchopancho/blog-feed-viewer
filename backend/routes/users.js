import express from "express";
import User from "../models/user.js";


const router = express.Router();


router.post("/", async (req, res) => {
    try {
        const user = await User.create(req.body);
        res.status(200).json(user);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
})

router.get("/", async (req, res) => {
    //User.find() instead of User.findOne() to get all users for now
    const users = await User.find();
    res.json(users);
});

export default router;