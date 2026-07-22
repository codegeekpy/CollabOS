const Express = require('express');
const app = Express();
const uploadModel = require('./models/project.model');
const cors = require('cors');

app.use(cors());
app.use(Express.json());

const projectList = [];
app.post("/projects",async(req,res)=>{
    const data = req.body;
  
    const upload = await uploadModel.create({
    ProtocolName : data.ProtocolName,
    Category : data.Category,
    Budget: data.Budget,
    Currency: data.Currency,
    Desc: data.Desc,
    url : data.url
    })
    return  res.status(201).json({
        message:"Successfully!"
    })
});

app.get("/projects",async(req,res)=>{
    const upload = await uploadModel.find();
    res.status(200).json({
        uploads : upload
    })
})





module.exports = app;