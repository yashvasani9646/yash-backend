import { Router } from "express";
console.log("✅ User routes loaded");
import {
  loginUser,
  LogoutUser,
  registerUser,
  refreshAccessToken,
} from "./../Controllers/User.Controller.js";
import { upload } from "../Middelwares/Multer.middelware.js";
import { verifyJWT } from "../Middelwares/Auth.middelware.js";
const router = Router();

router.route("/register").post(
  upload.fields([
    {
      name: "avatar",
      maxCount: 1,
    },
    {
      name: "coverImage",
      maxCount: 1,
    },
  ]),
  registerUser
);
router.get("/test", (req, res) => {
  res.send("Test Route Working");
});

router.route("/login").post(loginUser);
router.route("/logout").post(verifyJWT, LogoutUser);
router.route("/refresh-token").post(refreshAccessToken);

export default router;
