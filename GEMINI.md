# Project: Blog API

A full-stack blog platform with a Django REST Framework backend and a React (Vite) frontend.

## Tech Stack
- **Backend:** Django 6.0, Django REST Framework, PostgreSQL.
- **Frontend:** React 18, Vite, Tailwind CSS, React Router, Axios.
- **Infrastructure:** Docker, Docker Compose.

## Project Structure
- `/blog_api`: Backend configuration and settings.
- `/posts`: Main backend app for posts and comments.
- `/frontend`: React frontend application.

## Conventions
- **Backend:**
  - Use `SlugField` for post identification in URLs.
  - Implement object-level permissions (e.g., only authors can edit posts).
  - Use Django's built-in `User` model for authentication.
- **Frontend:**
  - Component-based architecture in `frontend/src/components`.
  - Service-based API calls in `frontend/src/services/blogService.js`.
  - Use Tailwind CSS for styling and Framer Motion for animations.

## Key Workflows
- **Development:**
  - Backend: `python manage.py runserver`
  - Frontend: `npm run dev` in the `frontend` directory.
- **Deployment:** Use Docker Compose to spin up the entire stack including PostgreSQL.
