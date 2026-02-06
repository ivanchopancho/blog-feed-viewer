import { API_BASE_URL } from "../config/api";
import { useState } from "react";

function LikeButton({ postId, likes, liked, setLikes, setLiked }) {

    const [loading, setLoading] = useState(false);

    const toggleLike = async () => {
        if (loading) return;
        setLoading(true);

        try {
            const res = await fetch(`${API_BASE_URL}/likes`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                credentials: "include",
                body: JSON.stringify({ post: postId }),
            });

            if (!res.ok) return;

            const data = await res.json();

            setLiked(data.liked);
            setLikes(data.likesCount);
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