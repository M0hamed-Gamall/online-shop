import { RequestHandler } from "express";
import { addUser} from '../models/auth.model'
import { validationResult} from 'express-validator'


export const postsignup: RequestHandler = async (req, res, next) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            req.flash("errors", errors.array().map((error) => error.msg)); 
            return res.redirect('/signup');  
        }
        await addUser(req.body);
        res.redirect('/');     
    } catch(err) {
        throw new Error(`can't add new user ${err}`)
    }
};
