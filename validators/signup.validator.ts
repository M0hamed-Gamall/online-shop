import { body} from 'express-validator'
import { emailExist } from '../models/auth.model';
import { Request } from 'express';
import { validationResult } from 'express-validator';

export const signupvalidate = [
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

export const valid = (req:Request)=>{
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        req.flash("errors", errors.array().map((error) => error.msg)); 
        return false; 
    }
    return true;
}