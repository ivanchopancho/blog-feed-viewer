import '../Post.css'
import LikeButton from "./LikeButton";
import CommentList from "./CommentList";
import CommentForm from "./CommentForm";
import { useState, useEffect } from "react";



function Post({ post }) {

    const [comments, setComments] = useState([]);

    useEffect(() => {
        fetch(`http://localhost:5000/comments/post/${post._id}`)
            .then(res => res.json())
            .then(data => setComments(Array.isArray(data) ? data : []));
    }, [post._id]);


    return (
        <div className="post">
            <div className="post-body">
                <p>{post.content}</p>
            </div>

            <div className="post-meta">
                <small>by {post.author?.username}</small>
            </div>

            <div className="post-actions">
                <LikeButton
                    postId={post._id}
                    initialLikes={post.likesCount}
                    initialLiked={false} />
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