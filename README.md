# Blog API

A RESTful Blog API built with Django REST Framework and PostgreSQL.

This project focuses on backend development concepts such as API design, authentication, database relationships, permissions, and clean backend architecture. The API is designed to serve frontend applications and supports full CRUD functionality for blog posts and comments.

---

## Features

- Token-based Authentication
- User Registration & Login
- CRUD Operations for Blog Posts
- Slug-based Routing for Cleaner URLs
- PostgreSQL Database Integration
- Object-level Permissions
- Protected Routes for Authenticated Users
- Relational Database Design using Foreign Keys
- RESTful API Architecture

---

## Tech Stack

- Python
- Django
- Django REST Framework
- PostgreSQL
- DRF Token Authentication

---

## API Endpoints

### Authentication

| Method | Endpoint | Description |
|---|---|---|
| POST | `/api/auth/register/` | Register a new user |
| POST | `/api/auth/login/` | Login and get auth token |

---

### Blog Posts

| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/posts/` | Get all posts |
| POST | `/api/posts/` | Create a new post |
| GET | `/api/posts/<slug:slug>/` | Get single post |
| PUT/PATCH | `/api/posts/<slug:slug>/` | Update a post |
| DELETE | `/api/posts/<slug:slug>/` | Delete a post |

---

## Database Relationships

```text
User
 ├── Posts
 └── Comments

Post
 └── Comments
```

Each post is linked to an author, and comments are connected to both users and posts through foreign key relationships.

---

## Installation

### Clone Repository

```bash
git clone https://github.com/krishmewati2006-design/blog_project.git

cd blog_project
```

---

### Create Virtual Environment

```bash
python -m venv venv
```

### Activate Virtual Environment

#### Windows

```bash
venv\Scripts\activate
```

#### Linux / Mac

```bash
source venv/bin/activate
```

---

### Install Dependencies

```bash
pip install -r requirements.txt
```

---

### Configure Database

Update the `DATABASES` settings inside:

```bash
blog_api/settings.py
```

Add your local PostgreSQL credentials.

---

### Run Server

```bash
python manage.py migrate

python manage.py runserver
```

API will run locally at:

```bash
http://127.0.0.1:8000/
```

---

## What I Learned

This project helped me improve my understanding of:

- Django REST Framework
- API Routing & Serialization
- PostgreSQL Integration
- Authentication & Permissions
- Database Relationships
- Slug-based URL Design
- Backend Project Structure
- Git & Environment Management

---

## Author

Krish Mewati

GitHub:
https://github.com/krishmewati2006-design