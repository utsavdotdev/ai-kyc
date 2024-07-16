import express from "express";
import cors from "cors";
import { connectDB } from "./utils/db.js";
import AuthRouter from "./router/AuthRouter.js";
import TokenRouter from "./router/TokenRouter.js";
import FilledUser from "./router/filledUserRouter.js";
import Form from "./router/formRouter.js";

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

connectDB();

//app routes
app.use("/api/auth", AuthRouter);
app.use("/api/token", TokenRouter);
app.use("/api/submitkyc", FilledUser);
app.use("/api/form", Form); // org create link

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server is listening on port ${PORT}`);
});
