# Cinetik

A full-stack media exploration and networking application that allows users to track their favorite movies and TV shows, maintain watchlists, connect with friends, and share reviews. Built with React, TypeScript, and FastAPI.

## 🎬 Features

- **Media Tracking**: Track watched shows and movies
- **Favorites Management**: Save and manage your favorite media
- **Watchlist**: Keep track of shows and movies you want to watch
- **Social Features**: See what your friends are watching
- **Reviews & Ratings**: Share your thoughts and read community reviews
- **Responsive Design**: Seamless experience across all devices
- **Modern UI**: Built with Radix UI and Tailwind CSS

## 🚀 Live Demo

Check out the live application: [https://cinetik.vercel.app/](https://cinetik.vercel.app/)

## 📁 Project Structure

This is a monorepo containing both the frontend and backend:

```
Cinetik/
├── frontend/          # React + TypeScript frontend
│   ├── src/
│   ├── public/
│   ├── package.json
│   └── vite.config.ts
├── backend/           # FastAPI backend
│   ├── main.py
│   ├── models/
│   ├── pyproject.toml
│   └── requirements.txt
└── README.md
```

## 🛠️ Tech Stack

### Frontend
- **React 18** - UI library
- **TypeScript** - Type safety
- **Vite** - Build tool and dev server
- **Tailwind CSS** - Styling
- **Radix UI** - Accessible components
- **Framer Motion** - Animations
- **React Query** - Data fetching and caching
- **React Router** - Routing
- **Zustand** - State management

### Backend
- **FastAPI** - Modern Python web framework
- **Python 3.8+** - Programming language
- **Pydantic** - Data validation
- **SQLAlchemy** - Database ORM
- **PostgreSQL** - Database (via psycopg2)
- **Uvicorn** - ASGI server

## 📦 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v14 or later) and npm/yarn
- **Python** (3.8.1 or higher)
- **PostgreSQL** (for database)
- **Git**

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/YOUR-USERNAME/Cinetik.git
cd Cinetik
```

### 2. Backend Setup

```bash
cd backend

# Using uv (recommended)
uv sync
source .venv/bin/activate  # On macOS/Linux
# or
.venv\Scripts\activate     # On Windows

# Or using pip
python -m venv venv
source venv/bin/activate  # On macOS/Linux
# or
venv\Scripts\activate     # On Windows
pip install -r requirements.txt
```

#### Configure Environment Variables

Create a `.env` file in the `backend/` directory:

```env
DATABASE_URL=postgresql://user:password@localhost:5432/cinetik
```

#### Initialize Database

```bash
python init_db.py
```

#### Run the Backend Server

```bash
python main.py
# Or using uvicorn directly
uvicorn main:app --host 0.0.0.0 --port 8000 --reload
```

The API will be available at `http://localhost:8000`

- **API Documentation**: `http://localhost:8000/docs` (Swagger UI)
- **Alternative Docs**: `http://localhost:8000/redoc` (ReDoc)

### 3. Frontend Setup

```bash
cd frontend

# Install dependencies
npm install
# or
yarn install

# Run development server
npm run dev
# or
yarn dev
```

The frontend will be available at `http://localhost:8080` (or the port shown in the terminal)

#### Configure API Endpoint

If your backend is running on a different port, update the API endpoint in `frontend/src/services/api-client.ts`

### 4. Build for Production

#### Frontend

```bash
cd frontend
npm run build
# or
yarn build
```

Production files will be in the `frontend/dist/` directory.

#### Backend

The backend is ready for production deployment. Use a production ASGI server like:

```bash
uvicorn main:app --host 0.0.0.0 --port 8000
```

## 📚 API Endpoints

### Favorites
- `GET /favorites` - Get all favorite media items
- `POST /favorites` - Add a new favorite
- `DELETE /favorites/{media_id}` - Remove a favorite
- `GET /favorites/is-favorite/{media_id}` - Check if media is favorited

### Watchlist
- `GET /watches` - Get all watchlist items
- `POST /watches` - Add item to watchlist
- `DELETE /watches/{media_id}` - Remove from watchlist

### Friends
- `GET /friends` - Get friends list
- `POST /friends` - Add a friend
- `DELETE /friends/{user_id}` - Remove a friend

For complete API documentation, visit `http://localhost:8000/docs` when the backend is running.

## 🧪 Development

### Frontend Development

```bash
cd frontend
npm run dev          # Start dev server
npm run build        # Build for production
npm run lint         # Run ESLint
npm run preview      # Preview production build
```

### Backend Development

```bash
cd backend

# Run with auto-reload
uvicorn main:app --reload

# Run tests
pytest

# Format code
black .

# Type checking
mypy .

# Linting
flake8 .
```

## 🗂️ Project Structure Details

### Frontend Structure

```
frontend/
├── src/
│   ├── components/      # React components
│   │   ├── card-components/
│   │   ├── filters/
│   │   ├── media-details/
│   │   ├── media-grids/
│   │   ├── page-components/
│   │   └── ui/
│   ├── hooks/          # Custom React hooks
│   ├── pages/          # Page components
│   ├── services/       # API clients
│   ├── entities/       # Type definitions
│   └── data/           # Static data
├── public/             # Static assets
└── package.json
```

### Backend Structure

```
backend/
├── main.py             # FastAPI application entry point
├── config.py           # Configuration settings
├── database.py         # Database connection
├── db_utils.py         # Database utilities
├── init_db.py          # Database initialization
├── models/             # Pydantic models
│   ├── favorites.py
│   ├── friends.py
│   ├── media.py
│   └── watches.py
└── pyproject.toml      # Project configuration
```

## 🔧 Configuration

### CORS Settings

The backend is configured to allow requests from:
- `http://localhost:3000`
- `http://localhost:8080`
- `https://cinetik.vercel.app`

To modify CORS settings, update the `origins` list in `backend/main.py`.

## 📝 Environment Variables

### Backend

Create `backend/.env`:

```env
DATABASE_URL=postgresql://user:password@localhost:5432/cinetik
```

### Frontend

Create `frontend/.env` (if needed):

```env
VITE_API_URL=http://localhost:8000
```

## 🚢 Deployment

### Frontend (Vercel)

The frontend is configured for Vercel deployment. See `frontend/vercel.json` for configuration.

### Backend

Deploy the FastAPI backend to any platform that supports Python:
- **Heroku**
- **Railway**
- **Render**
- **AWS** (Elastic Beanstalk, EC2, Lambda)
- **Google Cloud Platform**
- **Azure**

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 👤 Author

**Dylan Ballard**

- Email: ddballard55@gmail.com
- GitHub: [@dylanballard](https://github.com/dylanballard)

## 🙏 Acknowledgments

- [The Movie Database (TMDB)](https://www.themoviedb.org/) for media data
- All the amazing open-source libraries that made this project possible

---

Made with ❤️ by Dylan Ballard


