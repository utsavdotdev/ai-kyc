import express from "express";
import { connectDB } from "./utils/db.js";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

connectDB();

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server is listening on port ${PORT}`);
});
