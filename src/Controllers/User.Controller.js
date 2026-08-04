import asyncHandler from "../Utils/AsyncHandler.js";
import ApiError from "../Utils/ApiError.js";
import {User} from '../Models/User.Model.js'
import { uploadOnCloudinary } from "../Utils/Cloudinary.js";
import { ApiResponse } from "../Utils/Apiresponse.js";

const registerUser = asyncHandler(async (req, res) => {
  return res.status(200).json({
    message: "success",
  });

  const { fullname, email, username, password } = req.body;
  console.log("email:", email);
  

  if (
    [fullname, email, username, password].some((field) => field?.trim() === "")
  )
  
  {
    throw new ApiError(400, "All fields are required");
  }

 const existingUser = await User.findOne({
    $or:[{email: email},{username: username}]
  })

  if(existingUser){
    throw new ApiError(409,"User With Email or username already exists")
  }

const avtarLocalPath = req.files?.avatar [0]?.path
 const coverImageLocalPath = req.files?.coverImage [0]?.path

if(!avtarLocalPath){
  throw new ApiError(400,"Avatar file is required")  
}

const avtarCloudinaryUrl = await uploadOnCloudinary(avtarLocalPath);
const coverImageCloudinaryUrl = await uploadOnCloudinary(coverImageLocalPath);

if(!avtarCloudinaryUrl)
    {
      throw new ApiError(500,"Error while uploading avatar on cloudinary")
    }

const user = await User.create({
fullName,
avtar:avtar.url,
coverImage: coverImageCloudinaryUrl?.url || "",
email,
password,
username:username.toLowerCase()
})
  
const createdUser = await User.findById(user._id).select(
  "-password -refreshToken"
)

if(!createdUser){
  throw new ApiError(500,"Something went wrong while registering the user")
}
return response.status(201).json(
  new ApiResponse(201,createdUser,"User registered successfully")
)

});
export { registerUser };
