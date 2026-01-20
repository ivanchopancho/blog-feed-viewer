import jwt from "jsonwebtoken";
import User from "../models/user.js";

export default async function requireAuth(req, res, next) {
    try {
        const token = req.cookies?.token;

        if (!token) {
            return res.status(401).json({ error: "Not authenticated " });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        const user = await User.findById(decoded.id).select("-passwordHash");

        if (!user) {
            return res.status(401).json({ error: "User not found " });
        }

        req.user = user;
        next();
    } catch (err) {
        res.status(401).json({ error: "Invalid token " });
    }
}