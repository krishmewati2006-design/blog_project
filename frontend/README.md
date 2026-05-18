# DevBlog Frontend

A modern, responsive React frontend for the Django Blog API.

## Tech Stack
- **React** (Vite)
- **Tailwind CSS** (Styling)
- **React Router** (Navigation)
- **Axios** (API Requests)
- **Lucide React** (Icons)
- **Framer Motion** (Animations)

## Features
- **Authentication**: Full login/register flow with Token storage.
- **Blog Operations**: Create, Read, Update, and Delete posts.
- **Comments**: Real-time comment section for individual posts.
- **Modern UI**: High-fidelity, minimal design with Dark Mode support.
- **Responsive**: Optimized for mobile, tablet, and desktop views.
- **Clean Code**: Modular component architecture and centralized API services.

## Setup Instructions

1. **Navigate to the frontend directory**:
   ```bash
   cd frontend
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Configure Environment Variables**:
   Copy `.env.example` to `.env` and update the `VITE_API_URL` if your backend is running on a different port.
   ```bash
   cp .env.example .env
   ```

4. **Run the development server**:
   ```bash
   npm run dev
   ```

## Folder Structure
- `src/api/`: Axios configuration and interceptors.
- `src/components/`: Reusable UI components.
- `src/context/`: Global state (Authentication).
- `src/hooks/`: Custom React hooks.
- `src/layouts/`: Page wrappers (Main layout, Dark mode).
- `src/pages/`: Individual view components.
- `src/services/`: API business logic.
- `src/utils/`: Helper functions.

## Backend Compatibility
This frontend is designed to work out-of-the-box with the provided Django REST Framework backend. It maps specifically to the following endpoints:
- Auth: `/api/register/`, `/api/login/`
- Posts: `/api/posts/`, `/api/posts/create/`, `/api/posts/<slug>/`
- Comments: `/api/posts/<id>/comments/`
