import { RequestHandler } from "express";
import {emailExist , addUser} from '../models/auth.model'
import { body , validationResult} from 'express-validator'

export const validateUser = [
    body('username').notEmpty().withMessage("username is required"),
    body("email").isEmail().withMessage("enter a valid email"),
    body("password").notEmpty().withMessage("password is required"),
    body("confirm-password").custom((value,{req}) => {
        if(value !== req.body.password){
            throw new Error("passwords don't match")
        }
        return true;
    }),
    body("email").custom(async (value )=>{
        if(await emailExist(value)) {
            throw new Error("email is already exists")
        }
        return true;
    })
]

export const signup: RequestHandler = async (req, res, next) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            req.flash("errors", errors.array().map((error) => error.msg)); 
            return res.redirect('/signup');  
        }
        await addUser(req.body);
        res.redirect('/');
        
    } catch(err) {
        // go to errorHandler
        next(err);
    }
};
