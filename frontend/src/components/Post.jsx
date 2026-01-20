import '../Post.css'
import LikeButton from "./LikeButton";
import CommentList from "./CommentList";
import CommentForm from "./CommentForm";
import { useState, useEffect } from "react";



function Post({ post, onPostDeleted, onPostUpdated }) {

    const [comments, setComments] = useState([]);
    const [editing, setEditing] = useState(false);
    const [content, setContent] = useState(post.content);


    useEffect(() => {
        fetch(`http://localhost:5000/comments/post/${post._id}`)
            .then(res => res.json())
            .then(data => setComments(Array.isArray(data) ? data : []));
    }, [post._id]);

    const handleDelete = async () => {
        if (!confirm("Delete this post?")) return;

        await fetch(`http://localhost:5000/posts/${post._id}`, {
            method: "DELETE",
        });

        onPostDeleted(post._id);
    };


    const handleSave = async () => {
        const res = await
            fetch(
                `http://localhost:5000/posts/${post._id}`,
                {
                    method: "PUT",
                    headers: { "Content-type": "application/json" },
                    body: JSON.stringify({ content }),
                }
            );

        const updatedPost = await res.json();
        onPostUpdated(updatedPost);
        setEditing(false);
    }




    return (
        <div className="post">
            <div className="post-body">
                {editing ? (
                    <>
                        <textarea
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                        />
                        <button onClick={handleSave}>Save</button>
                        <button onClick={() => setEditing(false)}>Cancel</button>
                    </>
                ) : (
                    <p>{post.content}</p>
                )}
            </div>

            <div className="post-meta">
                <small>by {post.author?.username}</small>
            </div>

            <div className="post-actions">
                <LikeButton
                    postId={post._id}
                    initialLikes={post.likesCount}
                    initialLiked={false}
                />
                <button onClick={() => setEditing(true)}>Edit</button>
                <button onClick={handleDelete}>Delete</button>

            </div>

            <div className="post-comments">
                <CommentList comments={comments} />
                <CommentForm
                    postId={post._id}
                    onCommentAdded={(comment) =>
                        setComments(prev => [...prev, comment])
                    }
                />
            </div>


        </div>
    );
}

export default Post;