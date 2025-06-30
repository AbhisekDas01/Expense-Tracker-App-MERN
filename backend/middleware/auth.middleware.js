
import jwt, { decode } from 'jsonwebtoken'
import User from '../models/user.model.js'
import { JWT_SECRET } from '../config/env.js';


export const protect = async (req, res, next) => {

    let token;


    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        token = req.headers.authorization.split(' ')[1];
    }

    if (!token) {
        return res.status(401).json({
            success: false,
            message: "Unauthorized!"
        })
    }

    try {

        const decoded = jwt.verify(token, JWT_SECRET);

        const user = await User.findById(decoded.id).select("-password");

        req.user = user;
        next();


    } catch (error) {

        res.status(401).json({
            message: "Unauthorized!"
        })
    }
}