import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import postsRouter from "./routes/posts.js";
import usersRouter from "./routes/users.js";
import likesRouter from "./routes/likes.js";
import commentsRouter from "./routes/comments.js";
import authRouter from "./routes/auth.js";

const app = express();

const allowedOrigins = [
    "http://localhost:5173",
    "https://blog-feed-viewer.vercel.app"
];

app.use(cors({
    origin: function (origin, callback) {
        if (!origin) return callback(null, true);

        if (allowedOrigins.includes(origin)) {
            return callback(null, true);
        } else {
            return callback(new Error("Not allowed by CORS"));
        }
    },
    credentials: true,
}));

app.use(express.json());
app.use(cookieParser());

app.get("/health", (req, res) => {
    res.send("OK");
});

app.use("/posts", postsRouter);
app.use("/users", usersRouter);
app.use("/likes", likesRouter);
app.use("/comments", commentsRouter);
app.use("/auth", authRouter);


export default app;
