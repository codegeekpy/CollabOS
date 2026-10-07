

import Milestone from "../models/Milestone.js";


export const createMilestone = async(req,res)=>{
    try{
            const {project,title,description,amount} = req.body;
            
            const milestone = await Milestone.create({
                project,
                title,
                description,
                amount
            });
            res.status(201).json(milestone)
    }
    catch(e){
        res.status(500).json({
            message:"Couldnt create milestone",
            error:e.message,
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