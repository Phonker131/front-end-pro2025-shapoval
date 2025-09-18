import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import * as dotenv from "dotenv";
import { dirname, resolve } from "path";
import { fileURLToPath } from "url";
import todosRoutes from "./routes/todos.js";

const __dirname = dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: resolve(__dirname, ".env") });

mongoose.set("strictQuery", true);

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/todos", todosRoutes);

const { MONGO_URI, PORT = 5000 } = process.env;

if (!MONGO_URI) {
    console.error("MONGO_URI is missing");
    process.exit(1);
}

mongoose
    .connect(MONGO_URI, {
        serverSelectionTimeoutMS: 10000,
        dbName: "todo_db",
    })
    .then(() => {
        console.log("MongoDB connected");
        app.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}`));
    })
    .catch((err) => {
        console.error("MongoDB connection error:", err);
        process.exit(1);
    });
