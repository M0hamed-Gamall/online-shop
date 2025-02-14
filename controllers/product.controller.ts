import { RequestHandler } from "express";
import { getProductById } from '../models/products.model'

export const getproduct:RequestHandler = async(req , res , next)=>{
    try{
        const product = await getProductById(req.params.id)
        res.render('product' , {product : product , pageTitle:"Product"})
    }catch(err){
        next(err);
    }
}