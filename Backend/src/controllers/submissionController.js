import Submission from "../models/Submission.js";
import Milestone from "../models/Milestone.js";

export const createSubmission = async (req, res) => {
  try {
    const { milestone, contributor, description, proofUrl } = req.body;

    const submission = await Submission.create({
      milestone,
      contributor,
      description,
      proofUrl,
    });

    return res.status(201).json(submission);
  } catch (error) {
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