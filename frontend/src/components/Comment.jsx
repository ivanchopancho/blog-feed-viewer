function Comment({ comment }) {
    return (
        <div style={{ marginLeft: "1rem" }}>
            <p>{comment.content}</p>
            <small>{comment.author?.username}</small>
        </div>
    );
}

export default Comment;
