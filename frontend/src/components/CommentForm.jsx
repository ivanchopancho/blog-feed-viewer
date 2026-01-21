import { useState } from "react";

function CommentForm({ postId, onCommentAdded }) {
    const [content, setContent] = useState("");
    const [error, setError] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!content.trim()) {
            setError("Comment cannot be empty");
            return;
        }

        try {
            const res = await fetch("http://localhost:5000/comments", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                credentials: "include",
                body: JSON.stringify({
                    content,
                    post: postId,
                }),
            });

            if (!res.ok) {
                throw new Error("Failed to post comment");
            }

            const newComment = await res.json();
            onCommentAdded(newComment);
            setContent("");
            setError(null);
        } catch (err) {
            setError(err.message);
        }


    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Write a comment..."
            />

            <button type="submit">
                Comment
            </button>

            {error && <p style={{ color: "red" }}>{error}</p>}
        </form>
    )
}


export default CommentForm;