import { RequestHandler } from "express";
import {emailExist , addUser} from '../models/auth.model'
import { body , validationResult} from 'express-validator'

export const validateUser = [
    body('username').notEmpty().withMessage("username is required"),
    body("email").isEmail().withMessage("enter a correct email"),
    body("confirm-password").custom((value,{req}) => {
        if(value !== req.body.password){
            throw new Error("passwords don't match")
        }
        return true;
    }),
    body("email").custom(async (value )=>{
        if(await emailExist(value)){
            throw new Error("email is already exists")
        }
        return true;
    })
]

export const signup:RequestHandler = async (req,res,next)=>{
    // check if data is valid and send errors with express-flash
    // check if the email is unique
    //add data to database

  
    
}