import Post from "./Post";

function PostList({ posts, onPostUpdated, onPostDeleted, user }) {


    //console.log(posts.map(p => p._id));


    return (
        <div>
            {posts.map(post => (
                <Post
                    key={post._id}
                    post={post}
                    user={user}
                    onPostDeleted={onPostDeleted}
                    onPostUpdated={onPostUpdated}
                />
            ))}
        </div>
    );
}

export default PostList;
