import mongoose from "mongoose";


const milestoneSchema = new mongoose.Schema({
    project:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Project",
        required:true
    },
    title:{
        type : String,
        required:true,
        trim:true
    },
    description:{
        type:String,
        required:true,
        trim:true,
    },
    amount:{
        type:Number,
        required:true,
        min:0,
    },
    status:{
        type:String,
        enum:['pending','in_progress','completed'],
        default:'pending',
    },
    submissionStatus:{
        type:String,
        enum: ["not_submitted", "submitted", "approved", "rejected"],
        default:'not_submitted',
    }
},
{
    timestamps:true
}
);

const Milestone = mongoose.model("Milestone",milestoneSchema);

export default Milestone;