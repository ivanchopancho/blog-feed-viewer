import { useState } from "react";

function PostForm({ onPostCreated }) {
    const [content, setContent] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        const res = await fetch("http://localhost:5000/posts", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                content,
                author: "69576f9d2418bc228e399da6",
            }),
        });

        const newPost = await res.json();
        console.log("CREATED POST", newPost);
        onPostCreated(newPost);
        setContent("");
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
        </form>

    );
}

export default PostForm;