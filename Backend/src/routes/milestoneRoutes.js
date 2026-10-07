import express from "express";
import {
 createMilestone,
  getMilestone,
} from "../controllers/milestoneController.js";
const router = express.Router({ mergeParams: true });


router.get("/",getMilestone);
router.post("/",createMilestone);


export default router;