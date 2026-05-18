import React, { useState, useEffect } from 'react';
import blogService from '../services/blogService';
import PostCard from '../components/PostCard';
import Loading from '../components/Loading';
import { Newspaper } from 'lucide-react';

const Home = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await blogService.getPosts();
        setPosts(response.data.results || response.data);
      } catch (err) {
        setError('Failed to load posts. Please try again later.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  if (loading) return <Loading />;

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center">
        <p className="text-error mb-4 font-semibold">{error}</p>
        <button onClick={() => window.location.reload()} className="btn btn-outline">
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-12">
      <header className="space-y-4">
        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
          Insights for <span className="text-accent">developers</span>.
        </h1>
        <p className="max-w-2xl text-lg text-muted">
          Exploring the intersections of software engineering, design systems, and modern web architecture.
        </p>
      </header>

      {posts.length > 0 ? (
        <div className="grid gap-8">
          {posts.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-20 text-center border-2 border-dashed border-border rounded-xl">
          <Newspaper className="h-12 w-12 text-muted mb-4 opacity-20" />
          <h3 className="text-xl font-semibold mb-2">No posts yet</h3>
          <p className="text-muted">Check back later for new content or create your first post.</p>
        </div>
      )}
    </div>
  );
};

export default Home;
