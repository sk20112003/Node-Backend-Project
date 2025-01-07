import User from "../models/user.model.js";
export const getProfile = async(req , res)=>{
              try{
                const {username} = req.params;
                const user = await User.findOne({username})

                if(!user){
                    return res.status(400).json({error : 'User Not Found'})
                }
                    res.status(200).json(user);
              }catch(error){
                 console.log(`Error in get User profile controller: ${error}`)
                 res.status(500).json({error: "Internal server error"})
              }
}

