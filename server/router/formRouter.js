import { Router } from "express";
import { createForm } from "../controller/formController.js";
const router = Router();

router.post("/create", createForm);
export default router;
