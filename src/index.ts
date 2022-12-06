import express from "express";
import dotenv from "dotenv";
import routes from "./routes/routes_controller";

const app = express();
dotenv.config();
app.use(express.json());
const { PORT } = process.env;

app.use(routes);

app.listen(PORT, (): void => {
  console.log(`[Server]: Server Start: http://localhost:${PORT}`);
});

export default app;
