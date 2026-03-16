# Cinetik

A media discovery web app for movies and TV shows. Browse trending content, search titles, filter by genre and platform, and view detailed info with trailers and streaming availability. Built with React, TypeScript, Tailwind CSS, and powered by TMDB.

## Features

- **Browse & Discover**: Trending, top rated, and filtered media
- **Search**: Find movies and TV shows by title
- **Detailed Info**: Cast, trailers, streaming availability, and more
- **Responsive Design**: Seamless experience across all devices
- **Modern UI**: Built with Radix UI and Tailwind CSS

## Live Demo

Check out the live application: [https://cinetik.app/](https://cinetik.app/)

## Tech Stack

- **React 18** - UI library
- **TypeScript** - Type safety
- **Vite** - Build tool and dev server
- **Tailwind CSS** - Styling
- **Radix UI** - Accessible components
- **Framer Motion** - Animations
- **React Query** - Data fetching and caching
- **React Router** - Routing
- **Zustand** - State management
- **TMDB API** - Media data

## Getting Started

### Prerequisites

- **Node.js** (v14 or later) and npm
- **Git**

### Setup

```bash
git clone https://github.com/dballard10/Cinetik.git
cd Cinetik/Cinetik-Frontend

# Install dependencies
npm install

# Run development server
npm run dev
```

The app will be available at `http://localhost:8080` (or the port shown in the terminal).

### Environment Variables

Create `Cinetik-Frontend/.env`:

```env
VITE_TMDB_API_KEY=your_tmdb_api_key
VITE_TMDB_BASE_URL=https://api.themoviedb.org/3/
VITE_TMDB_READ_ACCESS_TOKEN=your_tmdb_read_access_token
```

Get your API key from [TMDB](https://www.themoviedb.org/settings/api).

### Build for Production

```bash
npm run build
```

Production files will be in the `dist/` directory.

### Development

```bash
npm run dev          # Start dev server
npm run build        # Build for production
npm run lint         # Run ESLint
npm run preview      # Preview production build
```

## Deployment

The frontend is deployed on [Vercel](https://vercel.com).

## Author

**Dylan Ballard**

- Email: ddballard55@gmail.com
- GitHub: [@dballard10](https://github.com/dballard10)

## Acknowledgments

- [The Movie Database (TMDB)](https://www.themoviedb.org/) for media data

---

Made by Dylan Ballard
