const mongoose=require("mongoose");

const noteSchema=mongoose.Schema({
    userId:String,
    name:String,
    title:String,
    desc:String,
    age:Number,
},{
    versionKey:false
})

const noteModel=mongoose.model("notes",noteSchema);

module.exports=noteModel