import React, { useState, useEffect } from 'react';
import {
  AppBar, Toolbar, Typography, TextField, Button, Paper,
  MenuItem, Box, Container, CircularProgress
} from '@mui/material';
import Masonry from 'react-masonry-css';

const categories = [
  'business', 'entertainment', 'general', 'health', 'science', 'sports', 'technology'
];

const countries = [
  { code: 'us', name: 'USA' },
  { code: 'gb', name: 'UK' },
  { code: 'in', name: 'India' },
  { code: 'au', name: 'Australia' },
  { code: 'ca', name: 'Canada' },
];

const red = "#C62828";
const darkRed = "#8B0000";
const cardBg = "#fff";

function App() {
  const [articles, setArticles] = useState([]);
  const [q, setQ] = useState('');
  const [category, setCategory] = useState('');
  const [country, setCountry] = useState('us');
  const [loading, setLoading] = useState(false);

  const fetchNews = async () => {
    setLoading(true);
    const backendUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:5000';
    let url = `${backendUrl}/api/news?country=${country}`;
    if (q) url += `&q=${encodeURIComponent(q)}`;
    if (category) url += `&category=${category}`;
    const res = await fetch(url);
    const data = await res.json();
    setArticles(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchNews();
    // eslint-disable-next-line
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    fetchNews();
  };

  // Masonry breakpoints
  const breakpointColumnsObj = {
    default: 4,
    1400: 3,
    900: 2,
    600: 1
  };

  return (
    <Box sx={{
      minHeight: '100vh',
      background: "#fff",
      width: "100%",
      boxSizing: "border-box"
    }}>
      <AppBar position="static" sx={{ bgcolor: red, boxShadow: 2 }}>
        <Toolbar sx={{ justifyContent: "center" }}>
          <Typography variant="h4" sx={{ fontWeight: 700, color: "#fff", letterSpacing: 2 }}>
            Global News Aggregator
          </Typography>
        </Toolbar>
      </AppBar>
      <Box sx={{marginLeft: "40px" , py: 4, width: "100%", maxWidth: "100%", mx: 0 }}>
        <Paper elevation={3} sx={{
          marginLeft: 2,
          marginRight: 2,
          px: { xs: 2, md: 4 }, py: 3, mb: 4, borderLeft: `8px solid ${red}`,
          borderRadius: 2, background: "#fafafa"
        }}>
          <form onSubmit={handleSearch} style={{ display: 'flex', gap: 16, flexWrap: "wrap", alignItems: "center" }}>
            <TextField
              label="Search"
              value={q}
              onChange={e => setQ(e.target.value)}
              variant="outlined"
              size="small"
              sx={{ flex: 2, minWidth: 180, bgcolor: "#fff" }}
              InputProps={{
                style: { borderRadius: 8 }
              }}
            />
            <TextField
              select
              label="Category"
              value={category}
              onChange={e => setCategory(e.target.value)}
              variant="outlined"
              size="small"
              sx={{ flex: 1, minWidth: 120, bgcolor: "#fff" }}
              InputProps={{
                style: { borderRadius: 8 }
              }}
            >
              <MenuItem value="">All</MenuItem>
              {categories.map(cat => (
                <MenuItem key={cat} value={cat}>{cat.charAt(0).toUpperCase() + cat.slice(1)}</MenuItem>
              ))}
            </TextField>
            <TextField
              select
              label="Country"
              value={country}
              onChange={e => setCountry(e.target.value)}
              variant="outlined"
              size="small"
              sx={{ flex: 1, minWidth: 120, bgcolor: "#fff" }}
              InputProps={{
                style: { borderRadius: 8 }
              }}
            >
              {countries.map(c => (
                <MenuItem key={c.code} value={c.code}>{c.name}</MenuItem>
              ))}
            </TextField>
            <Button type="submit" variant="contained" size="large"
              sx={{
                bgcolor: red, color: "#fff", fontWeight: 700, px: 4, borderRadius: 8,
                "&:hover": { bgcolor: darkRed }
              }}>
              Search
            </Button>
          </form>
        </Paper>
        {loading ? (
          <CircularProgress sx={{ display: 'block', mx: 'auto', my: 4, color: red }} />
        ) : (
          <Box sx={{ width: "100%", mx: "auto" }}>
            {articles.length === 0 && (
              <Box
                sx={{
                  minHeight: 400,
                  width: "100%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  bgcolor: "#fafafa",
                  borderRadius: 2,
                  boxShadow: 2,
                  mb: 2,
                }}
              >
                <Typography variant="h6" align="center" sx={{ color: red }}>
                  No articles found for this country.<br />Try another country or search globally.
                </Typography>
              </Box>
            )}


            <Masonry
              breakpointCols={breakpointColumnsObj}
              className="my-masonry-grid"
              columnClassName="my-masonry-grid_column"
            >
              {articles.map((article, idx) => (
                <Paper key={idx} elevation={4} sx={{
                  width: "100%",
                  maxWidth: 420,
                  minHeight: 280,
                  display: "flex",
                  flexDirection: "column",
                  bgcolor: cardBg,
                  borderLeft: `6px solid ${red}`,
                  borderRadius: 3,
                  overflow: "hidden",
                  mb: 2,
                  mx: "auto",
                  transition: "box-shadow .2s, transform .2s",
                  "&:hover": { boxShadow: 6, transform: "scale(1.01)" }
                }}>
                  {article.urlToImage && (
                    <Box sx={{
                      width: "100%",
                      height: 160,
                      background: "#eee",
                      flexShrink: 0,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center"
                    }}>
                      <img
                        src={article.urlToImage}
                        alt={article.title}
                        style={{
                          width: "100%",
                          height: "100%",
                          objectFit: "cover"
                        }}
                      />
                    </Box>
                  )}
                  <Box sx={{
                    flex: 1,
                    p: 2,
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between"
                  }}>
                    <Box>
                      <Typography variant="h6" sx={{
                        fontWeight: 700, color: darkRed, mb: 1
                      }}>
                        <a href={article.url} target="_blank" rel="noopener noreferrer"
                          style={{ textDecoration: 'none', color: darkRed }}>
                          {article.title}
                        </a>
                      </Typography>
                      <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                        {article.description}
                      </Typography>
                    </Box>
                    <Box sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      mt: 2
                    }}>
                      <Typography variant="caption" color="text.secondary">
                        {article.source?.name}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        {new Date(article.publishedAt).toLocaleString()}
                      </Typography>
                    </Box>
                  </Box>
                </Paper>
              ))}
            </Masonry>
          </Box>
        )}
      </Box>
      <Box sx={{
        py: 3, mt: 6, bgcolor: red, color: "#fff", textAlign: "center", width: "100%"
      }}>
        <Typography variant="body2">
          &copy; {new Date().getFullYear()} Global News Aggregator &mdash; Powered by NewsAPI.org
        </Typography>
      </Box>
      {/* Add Masonry grid CSS */}
      <style>
        {`
          .my-masonry-grid {
            display: flex;
            margin-left: -5px; /* gutter size offset */
            width: 100%;        /* use 100% not 100vw */
            box-sizing: border-box;
            overflow-x: hidden;
          }
          .my-masonry-grid_column {
            padding-left: 15px;
            padding-right: 15px;
            background-clip: padding-box;
          }
        `}
      </style>

    </Box>
  );
}

export default App;
