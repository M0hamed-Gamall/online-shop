import { body} from 'express-validator'
import { emailExist } from '../models/user.model';
import { validationResult } from 'express-validator';
import { RequestHandler } from 'express';

const valid:RequestHandler = (req , res , next)=>{
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        req.flash("errors", errors.array().map((error) => error.msg)); 
        return res.redirect('/signup')
    }
    next();
}

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
    }),
    valid
]
