import Project from "../models/Project.js";
import User from "../models/User.js";


export const createProject = async (req, res) => {
  try {
    const {
      name,
      description,
      budget,
      owner,
    } = req.body;

    if (!name || !description || budget === undefined || !owner) {
      return res.status(400).json({
        message: "name, description, budget, and owner are required",
      });
    }

    if (Number(budget) <= 0) {
      return res.status(400).json({
        message: "Project budget must be greater than zero",
      });
    }

    const ownerUser = await User.findById(owner);

    if (!ownerUser) {
      return res.status(404).json({
        message: "Project owner not found",
      });
    }

    if (ownerUser.role !== "client") {
      return res.status(400).json({
        message: "Project owner must be a client",
      });
    }

    const project = await Project.create({
      name,
      description,
      budget,
      owner: ownerUser._id,
      contributors: [],
    });

    return res.status(201).json(project);
  } catch (error) {
    console.error("Failed to create project:", error);

    return res.status(500).json({
      message: "Failed to create project",
      error: error.message,
    });
  }
};


export const getProjects = async(req,res)=>{
    try{
        const projects = await Project.find();
        res.status(200).json(projects);
    }
    catch(error){
        res.status(500).json({
            message:"Failed to fetch projects",
            error:error.message,
        });
    }
};


export const getProjectById = async(req,res)=>{
    try{
        const project = await Project.findById(req.params.id)
  .populate("owner")
  .populate("contributors");
        if(!project){
            return res.status(404).json({
                message:"Project Not Found",
            });
        }
        res.status(200).json(project);
    }
    catch(error){
        res.status(500).json({
            message:"Failed to fetch project",
            error:error.message,
        });
    }
};

export const updateProject = async (req,res)=>{
    try{
        const project = await Project.findByIdAndUpdate(
            req.params.id,
            req.body,{
                new:true,
                runValidators:true,
            }
        );
        if(!project){
            return res.status(404).json({
                message:"Project Not Found",
            });
        }
        res.status(200).json(project);
    }catch(error){
        res.status(500).json({
            message:"Failed to update Project",
            error:error.message,
        });
    }
};




export const addContributor = async (req, res) => {
  try {
    const { contributorId } = req.body;

    const project = await Project.findById(req.params.id);

    if (!project) {
      return res.status(404).json({
        message: "Project not found",
      });
    }

    const contributor = await User.findById(contributorId);

    if (!contributor) {
      return res.status(404).json({
        message: "Contributor not found",
      });
    }

    if (contributor.role !== "contributor") {
      return res.status(400).json({
        message: "User must have contributor role",
      });
    }

    await Project.findByIdAndUpdate(
      project._id,
      {
        $addToSet: {
          contributors: contributor._id,
        },
      },
      { new: true }
    );

    const updatedProject = await Project.findById(project._id)
      .populate("owner")
      .populate("contributors");

    return res.status(200).json(updatedProject);
  } catch (error) {
    return res.status(500).json({
      message: "Failed to add contributor",
      error: error.message,
    });
  }
};