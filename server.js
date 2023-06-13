import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import postRoutes from "./routes/posts.js";

dotenv.config();

const app = express();

app.use(express.json());

app.use('/api/posts', postRoutes);

const connectDB = async () => {
  try {
    mongoose.set("strictQuery", true);

    mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log("MongoDB connected");
  } catch (error) {
    console.error(err.message);
    process.exit(1);
  }
};

connectDB()
  .then(() => {
    app.listen(4000, () => console.log("Listening on port 4000"));
  })
  .catch((err) => console.log(err));

