import { generateToken } from "../lib/utils.js"
import User from "../models/user.model.js"
import bcrypt from "bcryptjs"
import cloudinary from "../lib/cloudinary.js"

export const signup= async (req,res)=>{
const {fullName,email,password}=req.body
if (!fullName || !email || !password) {
  return res.status(400).json({ message: "All fields are required" });
}
try {
  
  const user=await User.findOne({email})
  if (user) {
    return res.status(400).json({message:"Email already exist"})
  };

  if (password.length < 6) {
    return res.status(400).json({message:"Password must be at least 6 characters"})
  };

    const salt=await bcrypt.genSalt(10)
    const hashPassword= await bcrypt.hash(password,salt)

    const newUser= new User ({
      fullName,
      email,
      password:hashPassword
    })

    if(newUser){
      generateToken(newUser._id,res)
      await newUser.save()

      res.status(201).json({
        _id:newUser._id,
        fullName:newUser.fullName,
        email:newUser.email,
        profilePic: newUser.profilePic
      })


    }
    else{
      res.status(400).json({message:"Invalid user data"})
    }

} catch (error) {

  console.log("Error in signup controller", error.message)
  res.status(500).json({message:"Internal server error"})
}





}
//signup end
export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Find the user by email
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // Compare the provided password with the hashed password in the database
    const isPasswordCorrect = await bcrypt.compare(password, user.password);

    if (!isPasswordCorrect) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // Generate the JWT token and set the cookie
    generateToken(user._id, res);

    // Send the user data in the response after setting the token
    res.status(200).json({
      _id: user._id,
      fullName: user.fullName,
      email: user.email,
      profilePic: user.profilePic,
      createdAt: user.createdAt,
    });
  } catch (error) {
    console.log("Error in login controller", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};
// login end 
export const logout=(req,res)=>{
 try {
  res.cookie("jwt","",{maxAge:0})
  return res.status(200).json({message:"Logged out succesfully"})
 } catch (error) {
  console.log("Error in logout controller", error.message)
  res.status(500).json({message:"Internal server error"})
 }
}
// logout end 
export const updateProfile =async (req,res)=>{
try {
  
  const {profilePic}=req.body
  const userId=req.user._id // req user from protect rout calling 
  if (!profilePic) {
    return res.status(400).json({message:"Profile is reuired"})
  }

const uploadResponse= await cloudinary.uploader.upload(profilePic)

const updateUser=await User.findByIdAndUpdate(userId,{profilePic:uploadResponse.secure_url}, {new:true})


} catch (error) {
  console.log("Error in update profile controller", error.message)
  res.status(500).json({message:"Internal server error"})
}
}
// updateProfile end 
export const checkAuth =(req,res)=>{
  try {
    res.status(200).json(req.user)
  } catch (error) {
    console.log("Error in check auth controller", error.message)
  res.status(500).json({message:"Internal server error"})
  }
}
// checkauth end