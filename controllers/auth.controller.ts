import { RequestHandler } from "express";
import { addUser , login} from '../models/auth.model'
import { valid } from "../validators/signup.validator";

export const getsigup:RequestHandler = async(req,res,next)=>{
    res.render('signup');
}

export const getlogin:RequestHandler = async(req,res,next)=>{
    res.render('login');
}

export const postsignup: RequestHandler = async (req, res, next) => {
    try {
        if(valid(req)){
            await addUser(req);
            return res.redirect('/');     
        }
        return res.redirect('/signup'); 
    } catch(err) {
        throw err;
    }
};

export const postlogin: RequestHandler = async (req , res , next )=>{
    try{
        return await login(req) ?  res.redirect('/') : res.redirect('/login');
    } catch(err){
        throw err;
    }
}

export const logout:RequestHandler = (req , res , next)=>{
    req.session.destroy(()=>{
        res.redirect('/');
    })
}