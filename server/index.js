import express from "express";
import { connectDB } from "./utils/db.js";
import cors from "cors";

// router

import AuthRouter from "./router/AuthRouter.js";
import TokenRouter from "./router/TokenRouter.js";
import UserRouter from "./router/UserRouter.js";
import Form from "./router/formRouter.js";
import FilledUser from "./router/filledUserRouter.js";

const app = express();
app.use(cors());
//MiddleWares
app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:5173",
  })
);
app.use(express.urlencoded({ extended: false }));

connectDB();

//app routes
app.use("/api/auth", AuthRouter);
app.use("/api/token", TokenRouter);
app.use("/api/user", UserRouter);
app.use("/api/form", Form); // org create link
app.use("/api/submitkyc", FilledUser);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server is listening on port ${PORT}`);
});
