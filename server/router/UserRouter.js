import { Router } from "express";
import {
  getUser,
  getuserofForm,
  userLogout,
} from "../controller/UserController.js";
import AuthMiddleware from "../middleware/AuthMiddleware.js";

//Instance
const router = Router();

router.get("/", AuthMiddleware, getUser);
router.post("/logout", userLogout);
router.get("/getspecificfromuser/:formId", getuserofForm);

export default router;
