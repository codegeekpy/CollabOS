import User from "../models/User.js";


export const createUser = async(req,res)=>{
    try{
        const {walletAddress,role,name} = req.body;
        const existingUser = await User.findOne({walletAddress});

        if(existingUser){
            return res.status(409).json({
                message: "User already exists",
                user: existingUser,
            });
        }
        const user = await User.create({
            walletAddress,
            role,
            name,
        });
        res.status(201).json(User);
    }
    catch(error){
        res.status(500).json({
            message:"Couldn't create user",
            error: error.message,
        });
    }
};


export const getUser = async(req,res)=>{
    try{
        const users = await User.find()
        res.status(200).json(users);
    }
    catch(error){
        res.status(500).json({
            message:"Couldn't fetch users",
            error: error.message,
        });
    }
};