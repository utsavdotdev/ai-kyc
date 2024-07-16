import express from "express";
import { connectDB } from "./utils/db.js";
import AuthRouter from "./router/AuthRouter.js"
import TokenRouter from "./router/TokenRouter.js"

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

connectDB();


//app routes
app.use("/api/auth",AuthRouter);
app.use("/api/token", TokenRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server is listening on port ${PORT}`);
});
