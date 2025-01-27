import { body} from 'express-validator'
import { emailExist } from '../models/auth.model';

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