import { RequestHandler ,  Request, Response, NextFunction } from "express";

const notFound:RequestHandler = ((req,res,next)=>{
    res.status(404).render('notFoundError')
})

const serverError = ((err:any, req:Request, res:Response , next:NextFunction) => {
    console.log(err);
    res.status(500).render('serverError')
})

export const  errorHandling = [notFound , serverError];


