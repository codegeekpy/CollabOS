import mongoose, { mongo } from "mongoose";

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
        owner:{
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        contributors:[
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "User",
            },
        ],
    },
    {
        timestamps: true,
    }
);

const Project = mongoose.model("Project",projectSchema);

export default Project;