import express from 'express';
import morgan from "morgan";
import routes from "./routes";

const app: Express = express();
const port: number = process.env.PORT ? parseInt(process.env.PORT) : 8080;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("combined"));

app.get('/', (_req: Request , res: Response ) => {
    res.send('Hey there!');
});

app.use("/api", routes);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
