import mongoose from "mongoose";

const submissionSchema = new mongoose.Schema({
    milestone:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Milestone",
        required:true,
    },
    contributor:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required: true,
    },
    description:{
        type:String,
        required:true,
        trim:true,
    },
    proofUrl:{
        type:String,
        trim:true
    },
    status:{
        type:String,
        enum:["pending","approved","rejected"],
        default:"pending",
    },    
},
{
    timestamps:true,
}
);

const Submission = mongoose.model("Submission",submissionSchema);

export default Submission;