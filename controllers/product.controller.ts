import { RequestHandler } from "express";
import { getPeoductById } from '../models/products.model'

export const getproduct:RequestHandler = async(req , res , next)=>{
    try{
        const product = await getPeoductById(req.params.id)
        res.render('product' , {product : product})
    }catch(err){
        console.error("can't fetch the product : " , err);
    }
}