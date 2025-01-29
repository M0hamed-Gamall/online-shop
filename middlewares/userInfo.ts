import { RequestHandler } from "express";

export const save_user_info_in_locals:RequestHandler = (req,res,next)=>{
    res.locals.username = req.session.username;
    next();
}