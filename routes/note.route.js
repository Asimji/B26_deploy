const express=require("express");
const auth = require("../middlewares/auth.middleware");
const noteModel = require("../models/note.model");

const noteRouter=express.Router();

noteRouter.use(auth)

noteRouter.post("/create",async(req,res)=>{
   
    try {
        const note=new noteModel(req.body);
        await note.save();
        res.send(req.body)
    } catch (error) {
        res.status(400).json({error:error.message})
    }
})

noteRouter.get("/",async(req,res)=>{
    try {
        const note=await noteModel.find({userId:req.body.userId});
        res.send(note)
    } catch (error) {
        res.status(400).json({error:error.message})
    }
})

noteRouter.patch("/update/:id",async(req,res)=>{
    const userIDinUserDoc=req.body.userId
const {id}=req.params;
console.log(userIDinUserDoc)
try {
    const note=await noteModel.findOne({_id:id})
    const userIDinNoteDoc=note.userId;
   if(userIDinUserDoc===userIDinNoteDoc){
    await noteModel.findByIdAndUpdate({_id:id},req.body);
    res.json({mag:`${note.title} has been update`})
   }
    
} catch (error) {
    res.status(400).json({error:error.message})
}
    
    
})
noteRouter.delete("/delete/:id",async(req,res)=>{
  const userIDinUserDoc=req.body.userId;
  const {id}=req.params;
  try {
    const note=await noteModel.findOne({_id:id});
    if(userIDinUserDoc===note.userId){
        await noteModel.findByIdAndDelete({_id:id});
        res.json({msg:`${note.title} has been Deleted`})
    }
  } catch (error) {
    res.status(400).json({error:error.message})
  }

})

module.exports=noteRouter