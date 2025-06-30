import { Router } from "express";
import {registerUser , loginUser , getUserInfo} from '../controllers/auth.controller.js'
import {protect} from  "../middleware/auth.middleware.js";
import upload from "../middleware/upload.middleware.js";
const authRouter = Router();

//register 

authRouter.post('/register' , registerUser);

//login
authRouter.post('/login' , loginUser);

authRouter.get('/getUser' , protect , getUserInfo);

authRouter.post('/upload-image' , upload.single("image") , (req , res) => {
    if(!req.file){
        return res.status(400).json({
            message : "No file uploaded"
        })
    }

    const imageUrl = `${req.protocol}://${req.get('host')}/uploads/${req.file.filename}`

    res.status(200).send({
        imageUrl
    })
});

export default authRouter;