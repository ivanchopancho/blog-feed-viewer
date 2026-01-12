import { useState, useEffect } from 'react';
import PostList from "./components/PostList"
import PostForm from './components/PostForm';
import './App.css'



function App() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await fetch("http://localhost:5000/posts");
        if (!res.ok) {
          throw new Error("Failed to fetch posts");
        }
        const data = await res.json();
        setPosts(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className='app'>
      <h1 className='feed-title'>Feed</h1>
      <PostForm onPostCreated={(newPost) => setPosts((prev) => [newPost, ...prev])} />
      <PostList posts={posts} />
    </div>
  )


}

export default App
