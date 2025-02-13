import { RequestHandler } from "express";

export const getAddProduct:RequestHandler = (req,res,next)=>{
    res.render('addproduct');
}
export const postAddProduct:RequestHandler = (req,res,next)=>{
}
export const getMangeOrders:RequestHandler = (req,res,next)=>{
    res.render('manageorders')
}
export const postMangeOrders:RequestHandler = (req,res,next)=>{

}