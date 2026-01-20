import { useState, useEffect } from 'react';
import PostList from "./components/PostList"
import PostForm from './components/PostForm';
import LoginPage from './components/LoginPage';
import './App.css'



function App() {
  const [user, setUser] = useState(null);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);


  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await fetch("http://localhost:5000/auth/me", {
          credentials: "include",
        });

        if (!res.ok) {
          const data = await res.json();
          setUser(data.user);
        }
      } catch {
        //
      }
    };

    checkAuth();
  }, []);


  useEffect(() => {
    if (!user) return;

    const fetchPosts = async () => {
      try {
        const res = await fetch("http://localhost:5000/posts", {
          credentials: "include",
        });
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
  }, [user]);

  if (!user) {
    return <LoginPage onLogin={setUser} />
  }

  const handlePostDeleted = (postId) => {
    setPosts((prev) => prev.filter((p) => p._id !== postId));
  };

  const handlePostUpdated = (updatedPost) => {
    setPosts((prev) =>
      prev.map((p) => (p._id === updatedPost._id ? updatedPost : p))
    );
  };



  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className='app'>
      <h1 className='feed-title'>Feed</h1>
      <PostForm onPostCreated={(newPost) => setPosts((prev) => [newPost, ...prev])} />
      <PostList posts={posts} onPostUpdated={handlePostUpdated} onPostDeleted={handlePostDeleted} />
    </div>
  )


}

export default App
