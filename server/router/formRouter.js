import { Router } from "express";
import { createForm, getForms } from "../controller/formController.js";
const router = Router();

router.post("/create", createForm);
router.get("/get/:userId", getForms);
export default router;
