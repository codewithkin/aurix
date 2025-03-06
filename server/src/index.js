import express from 'express';
import UpworkScraper from './lib/scrapers/upwork.js';

const app = express();
const PORT = process.env.PORT || 8080;

app.get('/', (req, res) => {
  res.send('Welcome to the Express server!');
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});