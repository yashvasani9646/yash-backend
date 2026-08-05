import asyncHandler from "../Utils/AsyncHandler.js";
import ApiError from "../Utils/ApiError.js";
import { User } from "../Models/User.Model.js";
import { uploadOnCloudinary } from "../Utils/Cloudinary.js";
import { ApiResponse } from "../Utils/Apiresponse.js";

const registerUser = asyncHandler(async (req, res) => {
  // Get user details from frontend
  const { fullName, email, username, password } = req.body;
  console.log("========== REGISTER API HIT ==========");
  console.log("Body:", req.body);
  console.log("Files:", req.files);
  // Validation
  if (
    [fullName, email, username, password].some(
      (field) => !field || field.trim() === ""
    )
  ) {
    throw new ApiError(400, "All fields are required");
  }

  // Check if user already exists
  const existingUser = await User.findOne({
    $or: [{ email }, { username }],
  });

  if (existingUser) {
    throw new ApiError(409, "User with email or username already exists");
  }

  // Get avatar and cover image paths
  const avatarLocalPath = req.files?.avatar?.[0]?.path;
  const coverImageLocalPath = req.files?.coverImage?.[0]?.path;

  // Avatar is required
  if (!avatarLocalPath) {
    throw new ApiError(400, "Avatar file is required");
  }

  // Upload to Cloudinary
  const avatar = await uploadOnCloudinary(avatarLocalPath);
  const coverImage = coverImageLocalPath
    ? await uploadOnCloudinary(coverImageLocalPath)
    : null;

  if (!avatar) {
    throw new ApiError(500, "Error while uploading avatar on Cloudinary");
  }

  // Create user
  const user = await User.create({
    fullName,
    avatar: avatar.url,
    coverImage: coverImage?.url || "",
    email,
    password,
    username: username.toLowerCase(),
  });

  // Remove sensitive fields
  const createdUser = await User.findById(user._id).select(
    "-password -refreshToken"
  );

  if (!createdUser) {
    throw new ApiError(500, "Something went wrong while registering the user");
  }

     console.log("files:", req.files);

  return res
    .status(201)
    .json(new ApiResponse(201, createdUser, "User registered successfully"));
});

export { registerUser };