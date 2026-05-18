import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, User, ArrowRight } from 'lucide-react';

const PostCard = ({ post }) => {
  const formattedDate = new Date(post.created_date).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });

  return (
    <div className="card group overflow-hidden transition-all hover:border-accent/30 hover:shadow-md">
      <div className="p-6">
        <div className="mb-3 flex items-center gap-4 text-xs font-medium text-muted">
          <span className="flex items-center gap-1.5">
            <User size={14} />
            {post.author}
          </span>
          <span className="flex items-center gap-1.5">
            <Calendar size={14} />
            {formattedDate}
          </span>
        </div>
        
        <Link to={`/post/${post.slug}`}>
          <h2 className="mb-3 text-2xl font-bold leading-tight decoration-accent underline-offset-4 group-hover:underline">
            {post.title}
          </h2>
        </Link>
        
        <p className="mb-6 line-clamp-3 text-muted leading-relaxed">
          {post.content}
        </p>
        
        <Link 
          to={`/post/${post.slug}`} 
          className="inline-flex items-center gap-1 text-sm font-semibold text-accent transition-all hover:gap-2"
        >
          Read article
          <ArrowRight size={16} />
        </Link>
      </div>
    </div>
  );
};

export default PostCard;
