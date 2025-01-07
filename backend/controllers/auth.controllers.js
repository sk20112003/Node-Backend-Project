import User from "../models/user.model.js";
import bcrypt from "bcryptjs"
import generateToken from "../utils/generateTokens.js";

export const signup = async (req, res)=>{
    try{
        const {username , fullName , email , password} = req.body;

        const emailRegex =/^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if(!emailRegex.test(email)){
            return res.status(400).json({error:"Invalid email Format"})
        }

        const existingEmail = await User.findOne({email})
        const existingUsername = await User.findOne({username})

        if(existingEmail || existingUsername){
            return res.status(400).json({error:"Already Existing User or email"})
        }
        if(password.length < 6){
            return res.status(400).json({error: "Password must have atleast 6 char length"})
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password , salt);

        const newUser = new User({
            username,
            fullName,
            email,
            password:hashedPassword
        })

        if(newUser){
            generateToken(newUser._id , res)
            await newUser.save();
            res.status(200).json({
                _id : newUser._id,
                username : newUser.username,
                fullName: newUser.fullName,
                email : newUser.email,
                followers :newUser.followers,
                following : newUser.following,
                profileImg: newUser.profileImg,
                coverImg : newUser.coverImg,
                bio : newUser.bio,
                link : newUser.link
            })
        }else{
            res.status(400).json({error:"Invalid User Data"})
        }
    }catch(error){
        console.log(`Error in Signup controller : ${error}`)
        res.status(500).json({error: "Internal Server Error"})
    }
}

export const login = async (req, res)=>{
 try{
     const {username , password}=req.body;
     const user = await User.findOne({username});
     const ispassword= await bcrypt.compare(password , user?.password || "");

     if(!user || !ispassword){
        return res.status(400).json({error : "Invalid Username or password"})
     }

     generateToken(user._id , res);
     res.status(200).json({
        _id : user._id,
        username : user.username,
        fullName: user.fullName,
        email : user.email,
        followers :user.followers,
        following : user.following,
        profileImg: user.profileImg,
        coverImg : user.coverImg,
        bio : user.bio,
        link : user.link
     })
 }catch(error){
    console.log(`Error in login controller : ${error}`)
    res.status(500).json({error : "Internal Server Error"});
 }
}

export const logout =async(req,res)=>{
       try{
             res.cookie("jwt" , "" , {maxAge : 0});
             res.status(200).json({message : "Logout Succesfully"});
       } catch(error){
                     console.log(`Error in logout Controller : ${error}`)
                     res.status(500).json({error: "Internal server error"});
       }
}


export const getMe = async (req,res)=>{
    try{
        const user = await User.findOne({_id : req.user._id}).select("-password")
        res.status(200).json(user);

    }catch(error){
        console.log(`Error in getMe controller : ${error}`)
        res.status(500).json({error : 'Internal Server Error'});
    }
}

