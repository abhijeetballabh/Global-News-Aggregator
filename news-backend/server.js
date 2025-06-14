const express = require('express');
const axios = require('axios');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());

const PORT = 5000;

app.get('/api/news', async (req, res) => {
  const { q, category, country } = req.query;
  const apiKey = process.env.NEWS_API_KEY;
  let url = `https://newsapi.org/v2/top-headlines?apiKey=${apiKey}`;
  if (q) url += `&q=${q}`;
  if (category) url += `&category=${category}`;
  if (country) url += `&country=${country}`;

  try {
    const response = await axios.get(url);
    res.json(response.data.articles);
  } catch (err) {
    res.status(500).json({ error: 'Unable to fetch news articles' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
