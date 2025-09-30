import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db";
import integrationRoutes from "./routes/integrationRoutes";

dotenv.config();
connectDB();

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/integrations", integrationRoutes);

export default app;
