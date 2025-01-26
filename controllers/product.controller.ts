import { RequestHandler } from "express";
import { getProductById } from '../models/products.model'

export const getproduct:RequestHandler = async(req , res , next)=>{
    try{
        const product = await getProductById(req.params.id)
        res.render('product' , {product : product})
    }catch(err){
        throw new Error(`can't fetch the product : ${err} `);
    }
}