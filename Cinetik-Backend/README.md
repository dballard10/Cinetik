# Cinetik Backend

A FastAPI-based backend service for Cinetik - a media exploration and networking application that allows users to track their favorite movies and TV shows, as well as maintain a watchlist.

## Features

- **Favorites Management**: Add, remove, and view favorite movies and TV shows
- **Watchlist Management**: Track movies and TV shows you want to watch
- **Media Information**: Store and retrieve media details including backdrop images
- **Cross-Origin Support**: CORS enabled for frontend integration
- **RESTful API**: Clean, intuitive API endpoints
- **Type Safety**: Built with Pydantic models for data validation

## Tech Stack

- **FastAPI**: Modern, fast web framework for building APIs
- **Pydantic**: Data validation and settings management using Python type annotations
- **Uvicorn**: ASGI server for running the application
- **Python 3.8.1+**: Modern Python with type hints support

## Installation

### Prerequisites

- Python 3.8.1 or higher
- pip or uv (recommended)

### Using uv (recommended)

```bash
# Clone the repository
git clone https://github.com/dylanballard/cinetik-backend.git
cd cinetik-backend

# Install dependencies
uv sync

# Activate the virtual environment
source .venv/bin/activate  # On macOS/Linux
# or
.venv\Scripts\activate     # On Windows
```

### Using pip

```bash
# Clone the repository
git clone https://github.com/dylanballard/cinetik-backend.git
cd cinetik-backend

# Create virtual environment
python -m venv venv
source venv/bin/activate  # On macOS/Linux
# or
venv\Scripts\activate     # On Windows

# Install dependencies
pip install -r requirements.txt
```

## Usage

### Running the Server

```bash
# Run the development server
python main.py

# Or using uvicorn directly
uvicorn main:app --host 0.0.0.0 --port 8000 --reload
```

The API will be available at `http://localhost:8000`

### API Documentation

Once the server is running, you can access:

- **Interactive API docs**: `http://localhost:8000/docs` (Swagger UI)
- **Alternative API docs**: `http://localhost:8000/redoc` (ReDoc)

## API Endpoints

### Favorites

- `GET /favorites` - Get all favorite media items
- `POST /favorites` - Add a new favorite media item
- `DELETE /favorites/{media_id}` - Remove a favorite by media ID
- `GET /favorites/is-favorite/{media_id}` - Check if a media item is favorited

### Watchlist

- `GET /watches` - Get all watchlist items
- `POST /watches` - Add a new item to watchlist
- `DELETE /watches/{media_id}` - Remove an item from watchlist by media ID

### Example API Usage

#### Add a Favorite

```bash
curl -X POST "http://localhost:8000/favorites" \
     -H "Content-Type: application/json" \
     -d '{
       "media": {
         "id": 12345,
         "name": "The Matrix",
         "backdrop_path": "/path/to/backdrop.jpg",
         "media_type": "movie"
       }
     }'
```

#### Get All Favorites

```bash
curl -X GET "http://localhost:8000/favorites"
```

## Data Models

### Media

```python
{
  "id": int,
  "name": str,
  "backdrop_path": str,
  "media_type": "movie" | "tv"
}
```

### Favorite

```python
{
  "media": Media
}
```

### Watch

```python
{
  "media": Media
}
```

## Development

### Development Dependencies

Install development dependencies for testing, linting, and formatting:

```bash
uv sync --group dev
```

### Code Quality Tools

- **Black**: Code formatting
- **isort**: Import sorting
- **MyPy**: Type checking
- **Flake8**: Linting
- **Pytest**: Testing

### Running Tests

```bash
pytest
```

### Code Formatting

```bash
# Format code
black .

# Sort imports
isort .

# Type checking
mypy .

# Linting
flake8 .
```

## Project Structure

```
cinetik-backend/
├── main.py              # FastAPI application and route definitions
├── models/              # Pydantic models
│   ├── favorites.py     # Favorite model
│   ├── media.py         # Media model
│   └── watches.py       # Watch model
├── pyproject.toml       # Project configuration
├── requirements.txt     # Production dependencies
└── README.md           # This file
```

## Configuration

### CORS Settings

The application is configured to allow cross-origin requests from:

- `http://localhost:3000` (typical React development server)
- `http://localhost:8080` (typical Vue.js development server)

To modify CORS settings, update the `origins` list in `main.py`.

## Current Limitations

- **In-Memory Storage**: Data is stored in memory and will be lost when the server restarts
- **No Authentication**: Currently no user authentication or authorization
- **No Persistence**: No database integration yet

## Future Enhancements

- Database integration (PostgreSQL/MongoDB)
- User authentication and authorization
- Media search integration with external APIs
- User profiles and social features
- Deployment configuration

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Contact

Dylan Ballard - ddballard55@gmail.com

Project Link: [https://github.com/dylanballard/cinetik-backend](https://github.com/dylanballard/cinetik-backend)
