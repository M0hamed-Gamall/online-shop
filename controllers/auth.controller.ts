import { RequestHandler } from "express";
import { addUser , login} from '../models/auth.model'


export const getsigup:RequestHandler = async(req,res,next)=>{
    res.render('signup');
}

export const getlogin:RequestHandler = async(req,res,next)=>{
    res.render('login');
}

export const postsignup: RequestHandler = async (req, res, next) => {
    try {
        await addUser(req);
        return res.redirect('/');         
    } catch(err) {
        next(err);
    }
};

export const postlogin: RequestHandler = async (req , res , next )=>{
    try{
        return await login(req) ?  res.redirect('/') : res.redirect('/login');
    } catch(err){
        next(err);
    }
}

export const logout:RequestHandler = (req , res , next)=>{
    req.session.destroy(()=>{
        res.redirect('/');
    })
}