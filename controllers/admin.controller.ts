import { RequestHandler } from "express";
import { addproduct } from "../models/products.model"

export const getAddProduct:RequestHandler = (req,res,next)=>{
    res.render('addproduct');
}
export const postAddProduct:RequestHandler = async(req,res,next)=>{
    try {
        await addproduct(req);
        res.render('addproduct')
    } catch(err){
        next(err);
    }
}
export const getMangeOrders:RequestHandler = (req,res,next)=>{
    res.render('manageorders')
}
export const postMangeOrders:RequestHandler = (req,res,next)=>{

}