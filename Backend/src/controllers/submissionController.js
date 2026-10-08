import Submission from "../models/Submission.js";
import Milestone from "../models/Milestone.js";
import Project from "../models/Project.js";
import Escrow from "../models/Escrow.js";
import User from "../models/User.js";

export const createSubmission = async (req, res) => {
  try {
    const {
      milestone,
      contributor,
      description,
      proofUrl,
    } = req.body;

    if (!milestone || !contributor || !description) {
      return res.status(400).json({
        message: "milestone, contributor, and description are required",
      });
    }

    const milestoneDoc = await Milestone.findById(milestone);

    if (!milestoneDoc) {
      return res.status(404).json({
        message: "Milestone not found",
      });
    }

    if (milestoneDoc.status === "completed") {
      return res.status(400).json({
        message: "Cannot submit work for a completed milestone",
      });
    }

    const contributorDoc = await User.findById(contributor);

    if (!contributorDoc) {
      return res.status(404).json({
        message: "Contributor not found",
      });
    }

    if (contributorDoc.role !== "contributor") {
      return res.status(403).json({
        message: "Only contributors can submit work",
      });
    }

    const project = await Project.findById(milestoneDoc.project);

    if (!project) {
      return res.status(404).json({
        message: "Project not found",
      });
    }

    const assigned = project.contributors.some(
      (id) => id.toString() === contributor.toString()
    );

    if (!assigned) {
      return res.status(403).json({
        message: "Contributor is not assigned to this project",
      });
    }

    const escrow = await Escrow.findOne({ milestone });

    if (!escrow) {
      return res.status(400).json({
        message: "Milestone does not have an escrow",
      });
    }

    if (escrow.status !== "funded") {
      return res.status(400).json({
        message: "Escrow must be funded before work can be submitted",
      });
    }

    const existingSubmission = await Submission.findOne({
      milestone,
      status: "pending",
    });

    if (existingSubmission) {
      return res.status(409).json({
        message: "A pending submission already exists for this milestone",
      });
    }

    const submission = await Submission.create({
      milestone,
      contributor,
      description: description.trim(),
      proofUrl: proofUrl?.trim(),
      status: "pending",
    });

    await Milestone.findByIdAndUpdate(milestone, {
      submissionStatus: "submitted",
    });

    return res.status(201).json(submission);
  } catch (error) {
    console.error("Failed to create submission:", error);

    return res.status(500).json({
      message: "Failed to create submission",
      error: error.message,
    });
  }
};

export const getSubmissions = async (req, res) => {
  try {
    const submissions = await Submission.find({
      milestone: req.params.milestoneId,
    });

    return res.status(200).json(submissions);
  } catch (error) {
    return res.status(500).json({
      message: "Failed to fetch submissions",
      error: error.message,
    });
  }
};

export const updateSubmissionStatus = async (req, res) => {
  try {
    const { status } = req.body;

    if (!["approved", "rejected"].includes(status)) {
      return res.status(400).json({
        message: "Status must be approved or rejected",
      });
    }

    const submission = await Submission.findByIdAndUpdate(
      req.params.submissionId,
      { status },
      {
        new: true,
        runValidators: true,
      }
    );

    if (!submission) {
      return res.status(404).json({
        message: "Submission not found",
      });
    }

    if (status === "approved") {
      await Milestone.findByIdAndUpdate(
        submission.milestone,
        {
          status: "completed",
          submissionStatus: "approved",
        },
        {
          runValidators: true,
        }
      );
    }

    if (status === "rejected") {
      await Milestone.findByIdAndUpdate(
        submission.milestone,
        {
          submissionStatus: "rejected",
        },
        {
          runValidators: true,
        }
      );
    }

    return res.status(200).json(submission);
  } catch (error) {
    return res.status(500).json({
      message: "Failed to update submission",
      error: error.message,
    });
  }
};