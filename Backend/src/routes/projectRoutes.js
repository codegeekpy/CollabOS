import express from "express";

import{
    createProject,
    getProjects,
    getProjectById,
    updateProject,
    addContributor
} from "../controllers/projectController.js";

import { validateProject } from "../middleware/validateProject.js";
import validateRequest from "../middleware/validateRequest.js";

const router = express.Router();

router.post("/", validateProject,
  validateRequest,
  createProject);
router.get("/",getProjects);
router.get("/:id",getProjectById);
router.patch("/:id",updateProject);
router.patch("/:id/contributors",addContributor);


export default router;