import { RequestHandler } from "express";

export const flashHandler:RequestHandler = async (req ,res , next)=>{
    res.locals.flashed = {
        errors : req.flash("errors"),
        success: req.flash("success")
    }
    console.log(res.locals)
    next();
}