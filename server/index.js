import express from "express";
import { connectDB } from "./utils/db.js";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";

//  router imports
import AuthRouter from "./router/AuthRouter.js";
import TokenRouter from "./router/TokenRouter.js";
import UserRouter from "./router/UserRouter.js";
import FormRouter from "./router/formRouter.js";
import FilledUserRouter from "./router/filledUserRouter.js";
import upload from "./utils/multer.js"; // Import multer configuration

// Initialize express app
const app = express();

// Middlewares
app.use(cors());
app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:5173",
  })
);
app.use(express.urlencoded({ extended: false }));

// Serve static files
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
// generate the link of the file to be served to frontend

// Connect to the database
connectDB();

// Define routes
app.use("/api/auth", AuthRouter);
app.use("/api/token", TokenRouter);
app.use("/api/user", UserRouter);
app.use("/api/form", FormRouter); // Organization form creation endpoint
app.use("/api/submitkyc", upload, FilledUserRouter); // Endpoint hit from review.js to submit KYC data

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server is listening on port ${PORT}`);
});
