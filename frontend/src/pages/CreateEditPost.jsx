import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import blogService from '../services/blogService';
import Loading from '../components/Loading';
import { Save, X, Type, AlignLeft, CheckCircle2 } from 'lucide-react';

const CreateEditPost = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const isEditMode = !!slug;

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [status, setStatus] = useState('published');
  const [loading, setLoading] = useState(isEditMode);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (isEditMode) {
      const fetchPost = async () => {
        try {
          const response = await blogService.getPostDetail(slug);
          setTitle(response.data.title);
          setContent(response.data.content);
          setStatus(response.data.status);
        } catch (err) {
          console.error(err);
          navigate('/');
        } finally {
          setLoading(false);
        }
      };
      fetchPost();
    }
  }, [slug, isEditMode, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsSubmitting(true);

    const postData = { title, content, status };

    try {
      if (isEditMode) {
        await blogService.updatePost(slug, postData);
        navigate(`/post/${slug}`);
      } else {
        const response = await blogService.createPost(postData);
        navigate(`/post/${response.data.slug}`);
      }
    } catch (err) {
      setError(err.response?.data?.detail || 'Failed to save post. Please check your inputs.');
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) return <Loading />;

  return (
    <div className="max-w-3xl mx-auto space-y-8">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">{isEditMode ? 'Edit Post' : 'Create New Post'}</h1>
        <button 
          onClick={() => navigate(-1)} 
          className="btn btn-ghost gap-2 text-muted"
        >
          <X size={18} />
          Cancel
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        <div className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-semibold flex items-center gap-2" htmlFor="title">
              <Type size={16} className="text-accent" />
              Article Title
            </label>
            <input
              id="title"
              type="text"
              className="input text-xl font-bold h-12"
              placeholder="Enter a compelling title..."
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-semibold flex items-center gap-2" htmlFor="status">
              <CheckCircle2 size={16} className="text-accent" />
              Visibility
            </label>
            <select
              id="status"
              className="input"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
            >
              <option value="published">Published</option>
              <option value="draft">Draft</option>
            </select>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-semibold flex items-center gap-2" htmlFor="content">
              <AlignLeft size={16} className="text-accent" />
              Content
            </label>
            <textarea
              id="content"
              className="input min-h-[400px] py-4 leading-relaxed resize-y"
              placeholder="Write your thoughts here... (Markdown supported)"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              required
            />
          </div>
        </div>

        {error && (
          <p className="text-sm text-error bg-error/10 p-4 rounded border border-error/20">
            {error}
          </p>
        )}

        <div className="flex justify-end pt-4">
          <button 
            type="submit" 
            className="btn btn-primary h-12 px-8 gap-2 text-base"
            disabled={isSubmitting}
          >
            <Save size={20} />
            {isSubmitting ? 'Saving...' : (isEditMode ? 'Update Post' : 'Publish Article')}
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateEditPost;
