import { useState } from "react";

function LikeButton({ postId, initialLikes, initialLiked }) {
    const [likes, setLikes] = useState(initialLikes);
    const [liked, setLiked] = useState(initialLiked);
    const [loading, setLoading] = useState(false);

    const toggleLike = async () => {
        if (loading) return;

        try {
            setLoading(true);

            const res = await fetch("http://localhost:5000/likes", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    post: postId,
                    user: "userhard"
                }),
            });

            const data = await res.json();

            setLikes(data.likesCount);
            setLiked(!liked);
        } catch (err) {
            console.error("Failed to toggle like", err);
        } finally {
            setLoading(false);
        }
    }

    return (
        <button onClick={toggleLike} disabled={loading}>
            {liked ? "❤️" : "🤍"} {likes}
        </button>
    );
}

export default LikeButton;