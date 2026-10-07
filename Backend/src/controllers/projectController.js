import Project from "../models/Project.js";

export const createProject = async(req,res)=>{
    try{
        const {name,description,budget,owner} = req.body;
        const project = await Project.create({
            name,
            description,
            budget,
            owner,
        });
        res.status(201).json(project);
    }
    catch(error){
        res.status(500).json({
            message:"Failed to create project",
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
        const project = await Project.findById(req.params.id);
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




export const addContributor = async(req,res)=>{
    try{
        const {contributorId}= req.body;
        const project = await Project.findByIdAndUpdate(
            req.params.id,
            {
                $addToSet:{
                    contributors: contributorId,

                },
            
            },
            {
                new:true,
                runValidators:true,
            }
        );
        if (!project){
            return res.status(404).json({
                message:"Project not found",
            });
        }
        res.status(200).json(project);

    }
    catch(error){
        res.status(500).json({
            message:"Failed to add contributor",
            error: error.message,
        });
    }
}
