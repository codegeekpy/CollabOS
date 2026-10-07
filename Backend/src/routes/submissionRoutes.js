import express from "express";

import {
  createSubmission,
  getSubmissions,
  updateSubmissionStatus,
} from "../controllers/submissionController.js";

const router = express.Router({ mergeParams: true });

router.get("/", getSubmissions);
router.post("/", createSubmission);
router.patch("/:submissionId", updateSubmissionStatus);

export default router;