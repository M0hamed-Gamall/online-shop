import { RequestHandler } from "express";
import { getUserOrder , setUserOrder } from "../models/order.model";
import { deleteAllItems } from "../models/cart.model"

export const getorders:RequestHandler = async(req,res,next)=>{
    try {
        let orders = await getUserOrder(req);
        res.render('order' , {orders : orders , pageTitle:"Orders"})
    } catch(err){
        next(err);
    }
}

export const postorders:RequestHandler = async(req,res,next)=>{
    try {
        await setUserOrder(req);
        await deleteAllItems(req);
        res.redirect('orders');
    } catch(err){
        next(err);
    }
}