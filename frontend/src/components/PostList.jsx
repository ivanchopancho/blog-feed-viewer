import Post from "./Post";

function PostList({ posts }) {


    //console.log(posts.map(p => p._id));


    return (
        <div>
            {posts.map(post => (
                <Post key={post._id} post={post} />
            ))}
        </div>
    );
}

export default PostList;
