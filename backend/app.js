import express from "express";
import cors from "cors";
import postsRouter from "./routes/posts.js";
import usersRouter from "./routes/users.js";
import likesRouter from "./routes/likes.js";
import commentsRouter from "./routes/comments.js";

const app = express();

app.use(cors());
app.use(express.json());

app.get("/health", (req, res) => {
    res.send("OK");
});

app.use("/posts", postsRouter);
app.use("/users", usersRouter);
app.use("/likes", likesRouter);
app.use("/comments", commentsRouter);


export default app;
