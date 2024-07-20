import { Router } from "express";
import {
  createForm,
  getForms,
  checkURL,
  updateStatus,
  deleteForm,
  getInsights,
} from "../controller/formController.js";
const router = Router();

router.post("/create", createForm);
router.get("/get/:userId", getForms);
router.post("/checkUrl", checkURL);
router.patch("/updateStatus/:formId", updateStatus);
router.get("/getinfo/:userId", getInsights);
router.delete("/deleteForm/:formId", deleteForm);
export default router;
