import { RequestHandler } from "express";
import { addUser , login} from '../models/auth.model'
import { validationResult} from 'express-validator'

export const getsigup:RequestHandler = async(req,res,next)=>{
    res.render('signup');
}

export const getlogin:RequestHandler = async(req,res,next)=>{
    res.render('login');
}

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

export const postlogin: RequestHandler = async (req , res , next )=>{
    try{
        return await login(req) ?  res.redirect('/') : res.redirect('/login');
    } catch(err){
        throw err;
    }
}