import { useState } from "react";

function CommentForm({ postId, onCommentAdded }) {
    const [content, setContent] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!content.trim()) return;

        const res = await fetch("http://localhost:5000/comments", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                content,
                post: postId,
                author: "69576f9d2418bc228e399da6",
            }),
        });

        const newComment = await res.json();
        onCommentAdded(newComment);
        setContent("");


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
        </form>
    )
}


export default CommentForm;