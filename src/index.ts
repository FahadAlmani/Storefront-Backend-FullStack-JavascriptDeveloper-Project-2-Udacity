import express from "express";
import dotenv from "dotenv";
import routes from "./routes/routes_controller";

const app = express();
dotenv.config();
app.use(express.json());
const { PORT } = process.env;
app.get("/", (req: express.Request, res: express.Response): void => {
  res.send("Hello World");
});

app.use(routes);

app.listen(PORT, (): void => {
  console.log(`[Server]: Server Start: http://localhost:${PORT}`);
});

export default app;
