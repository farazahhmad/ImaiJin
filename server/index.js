import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import postRouter from "./routes/posts.js";
import generateImageRouter from "./routes/generateImage.js";

dotenv.config();

const app = express();
const port = process.env.PORT || 8080;

/* ======================
   MIDDLEWARE (FIRST)
====================== */
app.use(cors());
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true }));

/* ======================
   ROUTES
====================== */
app.use("/api/posts", postRouter);
app.use("/api/generateImage", generateImageRouter);

app.get("/", (req, res) => {
  res.status(200).json({
    message: "Hello from server",
  });
});

/* ======================
   ERROR HANDLER (LAST)
====================== */
app.use((err, req, res, next) => {
  const status = err.status || 500;
  const message = err.message || "Something went wrong!";
  res.status(status).json({
    success: false,
    status,
    message,
  });
});

/* ======================
   DATABASE CONNECTION
====================== */
const connectDB = async () => {
  try {
    mongoose.set("strictQuery", true);
    await mongoose.connect(process.env.MONGODB_URL);
    console.log(" MongoDB connected");
  } catch (error) {
    console.error(" MongoDB connection failed");
    console.error(error.message);
    process.exit(1); //  stop app if DB fails
  }
};

/* ======================
   SERVER START
====================== */
const startServer = async () => {
  await connectDB(); // ✅ WAIT for DB


  

  app.listen(port, () => {
    console.log(`✅ Server running on port ${port}`);
  });
};

startServer();
