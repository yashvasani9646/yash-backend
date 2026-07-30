import asyncHandler from "../Utils/AsyncHandler.js";

const registerUser = asyncHandler(async (req, res) => {
  return res.status(200).json({
    message: "success",
  });
});

export { registerUser };