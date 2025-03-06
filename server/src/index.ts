import express, { Request, Response } from 'express';
import morgan from "morgan";
import routes from "./routes";
import upworkCrawler from './scrapers/upwork';

const app = express();
const port: number = process.env.PORT ? parseInt(process.env.PORT) : 8080;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("combined"));

app.get('/', (_req: Request, res: Response) => {
    res.send('Hey there!');
});

upworkCrawler();

app.use("/api", routes);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
