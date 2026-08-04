import { Router } from "express";
import {registerUser} from './../Controllers/User.Controller.js';
import {upload} from '../Middelwares/Multer.middelware.js';
const router = Router()

router.route("/register").post(
    upload.fields([
        {
            name:"avtar",
            maxCount:1

        },
        {
            name:"coverImage",
            maxCount:1
        }
    ]),
    registerUser
)



export default router