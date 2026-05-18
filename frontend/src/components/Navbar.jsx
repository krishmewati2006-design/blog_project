import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { LogOut, PlusCircle, User, Moon, Sun } from 'lucide-react';

const Navbar = ({ toggleDarkMode, isDarkMode }) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="sticky top-0 z-40 w-full border-b border-border bg-bg/80 backdrop-blur-md">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link to="/" className="flex items-center gap-2 font-display text-xl font-bold tracking-tighter">
          <div className="h-6 w-6 rounded-sm bg-accent" />
          <span>DevBlog</span>
        </Link>

        <div className="flex items-center gap-4">
          <button 
            onClick={toggleDarkMode}
            className="btn btn-ghost p-2"
            aria-label="Toggle dark mode"
          >
            {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
          </button>

          {user ? (
            <>
              <Link to="/create" className="btn btn-ghost gap-2 hidden sm:flex">
                <PlusCircle size={18} />
                <span>New Post</span>
              </Link>
              <button onClick={handleLogout} className="btn btn-ghost gap-2">
                <LogOut size={18} />
                <span className="hidden sm:inline">Logout</span>
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="btn btn-ghost">Login</Link>
              <Link to="/register" className="btn btn-primary">Sign Up</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
