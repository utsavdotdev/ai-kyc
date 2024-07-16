import express from "express";
import { connectDB } from "./utils/db.js";
import AuthRouter from "./router/AuthRouter.js"
import TokenRouter from "./router/TokenRouter.js"
import UserRouter from "./router/UserRouter.js"
import cors from "cors";

const app = express();
//MiddleWares
app.use(express.json());
app.use(cors({
  origin: "http://localhost:5173",
}));
app.use(express.urlencoded({ extended: false }));


connectDB();


//app routes
app.use("/api/auth",AuthRouter);
app.use("/api/token", TokenRouter);
app.use("/api/user", UserRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server is listening on port ${PORT}`);
});
