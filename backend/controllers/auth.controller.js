import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { JWT_SECRET } from '../config/env.js';
import User from '../models/user.model.js';
import mongoose from 'mongoose';

//generate JWT token
const generateToken = (id) => {
    return jwt.sign({ id }, JWT_SECRET, { expiresIn: '1d' });
}


//register user
export const registerUser = async (req, res, next) => {

    const session = await mongoose.startSession();
    session.startTransaction();

    try {
        const { fullName, email, password, profileImageUrl } = req.body;

        //check if any field is not present 
        if (!fullName || !email || !password) {
            const error = new Error("All fields are mandetory!");
            error.statusCode = 400;
            throw error;
        }

        //check if user existt 
        const existingUser = await User.findOne({ email });

        if (existingUser) {
            const error = new Error("User already exists");
            error.statusCode = 409;
            throw error;
        }

        //create the user
        const user = await User.create([{
            fullName,
            email,
            password,
            profileImageUrl
        }] , {session});

        const token = generateToken(user._id);

        await session.commitTransaction();

        res.status(201).json({
            id: user._id,
            user: user[0],
            token
        });

    } catch (error) {
        await session.abortTransaction();

        // Send direct error response instead of passing to next middleware
        const statusCode = error.statusCode || 500;
        res.status(statusCode).json({
            success: false,
            message: error.message || 'An unexpected error occurred',
        });

    } finally {
        session.endSession();
    }
}

//Login user
export const loginUser = async (req, res) => {

    try {
        const { email, password } = req?.body;

        if (!email || !password) {
            const error = new Error("All fields are required");
            error.statuscode = 400;
            throw error;
        }

        //check if user doesnt exist
        const user = await User.findOne({ email });

        if (!user) {
            const error = new Error("User does not exists !");
            error.statusCode = 404;
            throw error;
        }

        //check if the password is matched
        const passwordMatched = await user.comparePassword(password);

        if (!passwordMatched) {
            const error = new Error("Incorrect password !");
            error.statusCode = 401;
            throw error;
        }

        const token = generateToken(user._id);

        return res.status(200).json({
            success: true,
            id: user._id,
            user,
            token
        })

    } catch (error) {

        const status = error.statusCode || 500;
        res.status(status).send({
            success: false,
            message: error.message || "Something went wrong"

        })
    }

}

//gat user info
export const getUserInfo = async (req, res) => {

    try {

        const id = req.user.id;

        

        const user = await User.findById(id).select('-password');

        if (!user) {
            const error = new Error("User doesn't exists");
            error.statusCode = 404;
            throw error;
        }


        res.status(200).json(user);

    } catch (error) {

        const status = error.statusCode || 500;
        res.status(status).send({
            success: false,
            message: error.message || "Something went wrong"

        })
    }
}
