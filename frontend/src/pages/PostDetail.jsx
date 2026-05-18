import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import blogService from '../services/blogService';
import { useAuth } from '../context/AuthContext';
import Loading from '../components/Loading';
import { Calendar, User, ArrowLeft, Edit, Trash2, MessageSquare, Send } from 'lucide-react';

const PostDetail = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [commentText, setCommentText] = useState('');
  const [isSubmittingComment, setIsSubmittingComment] = useState(false);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await blogService.getPostDetail(slug);
        setPost(response.data);
      } catch (err) {
        console.error(err);
        navigate('/');
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [slug, navigate]);

  const handleAddComment = async (e) => {
    e.preventDefault();
    if (!commentText.trim()) return;

    setIsSubmittingComment(true);
    try {
      const response = await blogService.createComment(post.id, commentText);
      setPost({
        ...post,
        comments: [response.data, ...post.comments]
      });
      setCommentText('');
    } catch (err) {
      console.error(err);
    } finally {
      setIsSubmittingComment(false);
    }
  };

  const handleDelete = async () => {
    if (!window.confirm('Are you sure you want to delete this post?')) return;
    
    try {
      await blogService.deletePost(slug);
      navigate('/');
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) return <Loading />;
  if (!post) return null;

  const isAuthor = user && post.author === localStorage.getItem('username'); // In a real app, use a proper ID comparison
  // Simplified for this demo: we'll check if the author name matches (requires backend to return current user or we store username)
  // Let's assume the user object in AuthContext has the username if we enhance it. 
  // For now, we'll just show the buttons if authenticated, the backend will handle the permission check.

  return (
    <article className="max-w-3xl mx-auto space-y-10">
      <Link to="/" className="inline-flex items-center gap-2 text-sm text-muted hover:text-accent transition-colors">
        <ArrowLeft size={16} />
        Back to feed
      </Link>

      <div className="space-y-6">
        <header className="space-y-4">
          <h1 className="text-4xl sm:text-5xl font-bold leading-[1.1] tracking-tight">
            {post.title}
          </h1>
          
          <div className="flex flex-wrap items-center gap-6 py-4 border-y border-border text-sm text-muted">
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-full bg-accent/10 flex items-center justify-center text-accent">
                <User size={16} />
              </div>
              <span className="font-medium text-fg">{post.author}</span>
            </div>
            
            <div className="flex items-center gap-2">
              <Calendar size={16} />
              <span>{new Date(post.created_date).toLocaleDateString('en-US', { dateStyle: 'long' })}</span>
            </div>

            {user && (
              <div className="flex items-center gap-4 ml-auto">
                <Link to={`/edit/${slug}`} className="btn btn-ghost p-2 text-muted hover:text-accent">
                  <Edit size={18} />
                </Link>
                <button onClick={handleDelete} className="btn btn-ghost p-2 text-muted hover:text-error">
                  <Trash2 size={18} />
                </button>
              </div>
            )}
          </div>
        </header>

        <div className="prose prose-lg dark:prose-invert max-w-none leading-relaxed text-lg whitespace-pre-wrap">
          {post.content}
        </div>
      </div>

      <section className="pt-16 border-t border-border space-y-8">
        <div className="flex items-center gap-2 font-display text-2xl font-bold">
          <MessageSquare size={24} className="text-accent" />
          <h2>Comments ({post.comments?.length || 0})</h2>
        </div>

        {user ? (
          <form onSubmit={handleAddComment} className="space-y-4">
            <textarea
              className="input min-h-[100px] py-3 resize-none"
              placeholder="Join the discussion..."
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
              required
            />
            <div className="flex justify-end">
              <button 
                type="submit" 
                className="btn btn-primary gap-2"
                disabled={isSubmittingComment}
              >
                <Send size={16} />
                Post Comment
              </button>
            </div>
          </form>
        ) : (
          <div className="p-6 bg-surface border border-border rounded-lg text-center">
            <p className="text-muted mb-4">You must be logged in to comment.</p>
            <Link to="/login" className="btn btn-outline">Login to comment</Link>
          </div>
        )}

        <div className="space-y-6">
          {post.comments && post.comments.length > 0 ? (
            post.comments.map((comment) => (
              <div key={comment.id} className="p-6 bg-surface/50 border border-border rounded-lg space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="font-bold text-accent">{comment.author}</span>
                  <span className="text-xs text-muted">
                    {new Date(comment.created_date).toLocaleDateString()}
                  </span>
                </div>
                <p className="leading-relaxed">{comment.text}</p>
              </div>
            ))
          ) : (
            <p className="text-center py-10 text-muted italic">No comments yet. Be the first to share your thoughts!</p>
          )}
        </div>
      </section>
    </article>
  );
};

export default PostDetail;
