import { RequestHandler } from "express";

export const save_user_info_in_locals:RequestHandler = (req,res,next)=>{
    res.locals.username = req.session.username;
    res.locals.isadmin = req.session.isadmin
    next();
}

export const isUser:RequestHandler = (req , res , next)=>{
    if(!req.session.userid)
        return res.redirect('/');
    next();
}

export const isNotUser:RequestHandler = (req , res , next)=>{
    if(req.session.userid)
        return res.redirect('/');
    next();
}

export const isAdmin:RequestHandler = (req , res , next)=>{
    if(!req.session.isadmin)
        return res.redirect('/');
    next();
}