
const jwt=require("jsonwebtoken");

const auth=(req,res,next)=>{
    const token=req.headers.authorization?.split(" ")[1];
    try {
        if(token){
            var decoded = jwt.verify(token, 'shhhhh');
            req.body.userId=decoded.userId
            req.body.name=decoded.name
            console.log(decoded)
            next();
        }
        else{
            res.status(200).json({msg:"Token not recognise"})
        }     
    } catch (error) {
        res.status(200).json({error:error.message})
    }
   
}
module.exports=auth