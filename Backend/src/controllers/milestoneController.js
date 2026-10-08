import Project from "../models/Project.js";

import Milestone from "../models/Milestone.js";

export const createMilestone = async (req, res) => {
  try {
    const { title, description, amount } = req.body;
    const { projectId } = req.params;

    if (!title || !description || amount === undefined) {
      return res.status(400).json({
        message: "title, description, and amount are required",
      });
    }

    if (Number(amount) <= 0) {
      return res.status(400).json({
        message: "Milestone amount must be greater than zero",
      });
    }

    const project = await Project.findById(projectId);

    if (!project) {
      return res.status(404).json({
        message: "Project not found",
      });
    }

    if (project.status === "completed" || project.status === "cancelled") {
      return res.status(400).json({
        message: "Cannot add milestones to this project",
      });
    }

    const milestone = await Milestone.create({
      project: project._id,
      title: title.trim(),
      description: description.trim(),
      amount: Number(amount),
      status: "pending",
      submissionStatus: "not_submitted",
    });

    return res.status(201).json(milestone);
  } catch (error) {
    console.error("Failed to create milestone:", error);

    return res.status(500).json({
      message: "Failed to create milestone",
      error: error.message,
    });
  }
};

export const getMilestone = async (req, res) => {
  try {
    

    const allMilestones = await Milestone.find();



    const milestones = await Milestone.find({
      project: req.params.projectId,
    });

    console.log("MATCHING MILESTONES:", milestones);

    res.status(200).json(milestones);
  } catch (error) {
    res.status(500).json({
      message: "Couldn't fetch milestones",
      error: error.message,
    });
  }
};