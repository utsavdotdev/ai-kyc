import { Router } from "express";
import { submitKYC } from "../controller/filledUserController.js";

//Instance
const router = Router();

router.post("/post", submitKYC); // for the user to submit their KYC  form
export default router;
