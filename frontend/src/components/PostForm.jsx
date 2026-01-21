import { useState } from "react";

function PostForm({ onPostCreated }) {
    const [content, setContent] = useState("");
    const [error, setError] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!content.trim()) return;

        try {
            const res = await fetch("http://localhost:5000/posts", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                credentials: "include",
                body: JSON.stringify({ content }),
            });

            if (!res.ok) {
                throw new Error("Unauthorized or invalid post");
            }

            const newPost = await res.json();
            onPostCreated(newPost);
            setContent("");
        } catch (err) {
            setError(err.message);
        }
    };

    {/* 

         

        */}

    return (

        <form onSubmit={handleSubmit}>
            <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder={"Write a post..."}
            />
            <button type={"submit"}>Post</button>

            {error && <p style={{ color: "red" }}>{error}</p>}
        </form>

    );
}

export default PostForm;