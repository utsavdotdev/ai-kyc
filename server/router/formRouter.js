import { Router } from "express";
import { createForm, getForms,checkURL } from "../controller/formController.js";
const router = Router();

router.post("/create", createForm);
router.get("/get/:userId", getForms);
router.post("/checkUrl", checkURL);
export default router;
