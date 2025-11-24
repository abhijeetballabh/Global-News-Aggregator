# Global News Aggregator

A full-stack news aggregation application that allows users to search for and browse news articles from around the world. Built with React 19 and Express, featuring a modern UI and powerful news aggregation capabilities.

## 🌟 Key Features

- **Multi-country support**: Browse news from USA, UK, India, Australia, and Canada
- **Category filtering**: Filter news by business, entertainment, general, health, science, sports, and technology
- **Search functionality**: Find specific news articles with intuitive search
- **Responsive design**: Beautiful masonry layout for optimal viewing on all devices
- **Fast development**: Vite-powered frontend for rapid development cycles
- **RESTful API**: Express backend that proxies to NewsAPI with flexible filtering

## 📁 Project Structure

```
news-app/
├── src/                          # React frontend source code
│   ├── App.jsx                   # Main application component
│   ├── App.css                   # Application styles
│   ├── main.jsx                  # Entry point
│   ├── index.css                 # Global styles
│   └── assets/                   # Static assets
├── news-backend/                 # Express backend server
│   ├── server.js                 # Main server file
│   ├── package.json              # Backend dependencies
│   └── .env                      # Environment variables (NEWS_API_KEY)
├── public/                       # Static public files
├── package.json                  # Frontend dependencies
├── vite.config.js                # Vite configuration
├── eslint.config.js              # ESLint configuration
└── README.md                     # This file
```

## 🛠 Tech Stack

### Frontend
- **React 19.1.0**: Modern UI library
- **Vite 6.3.5**: Next-generation build tool
- **Material-UI 7.1.1**: Professional component library
- **React Masonry CSS 1.0.16**: Responsive masonry grid layout
- **Emotion**: CSS-in-JS styling solution

### Backend
- **Express 5.1.0**: Fast web framework
- **Axios 1.10.0**: Promise-based HTTP client
- **CORS 2.8.5**: Cross-origin resource sharing middleware
- **dotenv 16.5.0**: Environment variable loader

## 📦 Installation

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn
- NewsAPI key from [newsapi.org](https://newsapi.org)

### Frontend Setup

1. Navigate to the project root:
   ```bash
   cd news-app
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start development server:
   ```bash
   npm run dev
   ```

   Frontend will be available at `http://localhost:5173`

### Backend Setup

1. Navigate to backend directory:
   ```bash
   cd news-backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create `.env` file:
   ```
   NEWS_API_KEY=your_api_key_here
   ```

4. Start the server:
   ```bash
   node server.js
   ```

   Backend will be running at `http://localhost:5000`

## 🚀 Available Scripts

### Frontend
- `npm run dev` - Start development server with hot reload
- `npm run build` - Build optimized production bundle
- `npm run lint` - Run ESLint to check code quality
- `npm run preview` - Preview production build locally

### Backend
- `node server.js` - Start the Express server

## 🔌 API Reference

### GET `/api/news`

Fetch news articles based on filters.

**Query Parameters:**
| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| q | string | No | Search query |
| category | string | No | News category |
| country | string | No | Country code |

**Example Requests:**
```bash
GET http://localhost:5000/api/news?category=technology&country=us
GET http://localhost:5000/api/news?q=artificial%20intelligence
GET http://localhost:5000/api/news?country=gb&category=business
```

**Response:**
```json
[
  {
    "source": { "id": "...", "name": "..." },
    "author": "...",
    "title": "...",
    "description": "...",
    "url": "...",
    "urlToImage": "...",
    "publishedAt": "...",
    "content": "..."
  }
]
```

## 📰 Supported Categories

- business
- entertainment
- general
- health
- science
- sports
- technology

## 🌍 Supported Countries

| Code | Country |
|------|---------|
| us | United States |
| gb | United Kingdom |
| in | India |
| au | Australia |
| ca | Canada |

## 💻 Development

### Code Quality
Run ESLint to maintain code standards:
```bash
npm run lint
```

### Production Build
Create optimized production bundle:
```bash
npm run build
```

The `dist/` folder contains the production-ready files.

## 🐛 Troubleshooting

| Issue | Solution |
|-------|----------|
| Port 5173 in use | Vite will automatically use next available port |
| Port 5000 in use | Edit `PORT` variable in `news-backend/server.js` |
| CORS errors | Ensure both frontend and backend servers are running |
| No articles appear | Verify NewsAPI key is valid in `.env` file |
| Rate limit exceeded | Check your NewsAPI plan limits |

## 📋 Environment Variables

Create a `.env` file in the `news-backend` directory:

```env
NEWS_API_KEY=your_newsapi_key_here
```

## 🚀 Future Enhancements

- [ ] User authentication and accounts
- [ ] Save/bookmark favorite articles
- [ ] Dark mode support
- [ ] Advanced filtering and sorting options
- [ ] Pagination for better performance
- [ ] Share articles on social media
- [ ] Reading time estimates
- [ ] Article comments and ratings
