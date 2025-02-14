import { RequestHandler } from "express";
import { addproduct } from "../models/products.model"
import { getPendingOrders , approveOrder } from "../models/order.model"

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
export const getMangeOrders:RequestHandler = async(req,res,next)=>{
    try {
        let orders = await getPendingOrders();
        res.render('manageorders' , {orders : orders})
    } catch(err){
        next(err)
    }
}
export const postMangeOrders:RequestHandler = async(req,res,next)=>{
    try {
        await approveOrder(req.body.orderId);
        res.redirect('manage-orders');
    } catch(err){
        next(err);
    }
}