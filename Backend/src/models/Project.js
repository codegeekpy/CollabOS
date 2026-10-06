import mongoose from "mongoose";

const projectSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true,
        },
        description: {
            type: String,
            required: true,
            trim: true,
        },
        budget: {
            type: Number,
            required: true,
            min: 0,
        },
        status: {
            type: String,
            enum: ["draft", "active", "completed", "cancelled"],
            default: "draft",
        },
    },
    {
        timestamps: true,
    }
);

const Project = mongoose.model("Project",projectSchema);

export default Project;