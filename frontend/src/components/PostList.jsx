import Post from "./Post";

function PostList({ posts, onPostUpdated, onPostDeleted }) {


    //console.log(posts.map(p => p._id));


    return (
        <div>
            {posts.map(post => (
                <Post
                    key={post._id}
                    post={post}
                    onPostDeleted={onPostDeleted}
                    onPostUpdated={onPostUpdated}
                />
            ))}
        </div>
    );
}

export default PostList;
