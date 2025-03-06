import express from 'express';
import router from './routes/jobs.js';
import morgan from "morgan";

const app = express();
const PORT = process.env.PORT || 8080;

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(morgan("combined"))

app.get('/', (req, res) => {
  res.send('Welcome to the Express server!');
});

app.use('/api', router);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});