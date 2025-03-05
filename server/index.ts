import express from 'express';
import routes from "./src/routes"

const app = express();
const port = process.env.port || 8080;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.send('Hey there !');
});

app.get("/api", routes);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});