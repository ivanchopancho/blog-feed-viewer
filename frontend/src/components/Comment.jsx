function Comment({ comment }) {
    return (
        <div className="comment">
            <p className="comment-content">{comment.content}</p>
            <small className="comment-author">{comment.author?.username}</small>
        </div>
    );
}

export default Comment;
