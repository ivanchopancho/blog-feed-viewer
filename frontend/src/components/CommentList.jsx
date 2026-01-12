
import Comment from "./Comment";

function CommentList({ comments }) {

    //console.log("COMMENTS", comments, Array.isArray(comments));
    return (
        <div>
            {comments.map(comment => (
                <Comment key={comment._id} comment={comment} />
            ))}
        </div>
    );
}

export default CommentList;
